import { z } from "zod";

export const signInValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInValidationType = z.infer<typeof signInValidation>;
