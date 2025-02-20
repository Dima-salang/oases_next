import { z } from "zod";
export const createStudentSchema = z.object({
    student_id: z.string(),
    username: z.string().min(1, "Username is required").max(16, "Username must be less than 16 characters").trim(),
    password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be less than 16 characters").trim(),
    name: z.preprocess((value) => (typeof value === 'string' ? value.trim() : ''), z.string().min(1, "Name is required")),
    user_id: z.string().trim().optional(),
});




export const signInSchema = z.object({
    username: z.string().min(1, "Username is required").max(16, "Username must be less than 16 characters").trim(),
    password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be less than 16 characters").trim(),
});