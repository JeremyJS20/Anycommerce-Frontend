import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().min(2, "auth.errors.first_name_min"),
    lastName: z.string().min(2, "auth.errors.last_name_min"),
    email: z.string().email("auth.errors.invalid_email"),
    password: z
        .string()
        .min(8, "auth.errors.password_min")
        .regex(/[A-Z]/, "auth.errors.password_uppercase")
        .regex(/[0-9]/, "auth.errors.password_number")
        .regex(/[^A-Za-z0-9]/, "auth.errors.password_special"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "auth.passwords_dont_match",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
