import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 3 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be at most 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username must start with a letter, end with a letter or number, and contain only letters, numbers, or hyphens."
    )
    // username must start with a letter, end with a letter or number, and contain only letters, numbers, or hyphens.
    .refine(
      (val) => !val.includes("--"),
      "Username must not contain double hyphens"
    )
    .transform((val) => val.toLowerCase()),
});
