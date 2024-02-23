import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  username: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long." }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" })
    .max(30, { message: "Username should not exceed 30 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Username cannot be empty",
    })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "Username should only contain letters and numbers",
    }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((value) => value.trim() !== "", {
      message: "Email cannot be empty",
    }),

  password: z.string().refine((value) => value.trim() !== "", {
    message: "Password cannot b e empty",
  }),
});

export type TcreateUserSchema = z.infer<typeof createUserSchema>;
