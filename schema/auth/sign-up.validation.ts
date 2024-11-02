import { z } from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Name should have at least 3 letters" })
    .max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should have atleast 8 characters" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message: "Strong password required",
    }),
});

export type SignUpValidationType = z.infer<typeof SignUpValidation>;
