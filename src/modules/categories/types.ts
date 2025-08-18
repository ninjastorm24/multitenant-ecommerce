import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
export type CategoriesGetManyOutputs =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CategoriesGetManyOutputsSingle = CategoriesGetManyOutputs[0];
