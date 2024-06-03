import z from "zod";

const userSignUpValidationSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must contain at least 3 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const userSignInValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." }),
});

export default {
  userSignInValidationSchema,
  userSignUpValidationSchema,
};
