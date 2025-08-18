import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import z from "zod";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });
    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z
          .string()
          .min(3, "Username must be at least 3 characters")
          .max(63, "Username must be at most 63 characters")
          .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)
          // username must start with a letter, end with a letter or number, and contain only letters, numbers, or hyphens.
          .refine(
            (val) => !val.includes("--"),
            "Username must not contain double hyphens"
          )
          .transform((val) => val.toLowerCase()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password, // this will be hashed
          username: input.username,
        },
      });

      // after create new user immediately login
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // sameSite: "none",
        // domain: "",
        // TODO: Ensure cross domain cookie sharing.
        // funroad.com // initial cookie
        // siam.funroad.com // cookie doesn't exist here
      });
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // sameSite: "none",
        // domain: "",
        // TODO: Ensure cross domain cookie sharing.
        // funroad.com // initial cookie
        // siam.funroad.com // cookie doesn't exist here
      });

      return data;
    }),
});
