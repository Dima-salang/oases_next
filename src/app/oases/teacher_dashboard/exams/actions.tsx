'use server';

import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '@/db/schema';
import { z } from 'zod';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);


const formDataSchema = z.object({
    username: z.string().min(1, "Username is required").max(16, "Username must be less than 16 characters").trim(),
    password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be less than 16 characters").trim(),
    name: z.preprocess((value) => (typeof value === 'string' ? value.trim() : ''), z.string().min(1, "Name is required")),
    user_id: z.string().trim().optional(),
});

export async function createTest(formData: FormData) {
    
    const formDataObject = Object.fromEntries(formData.entries());
    const parsedFormData = formDataSchema.safeParse(formDataObject);
    if (!parsedFormData.success) {
        throw new Error(parsedFormData.error.message);
    }

    const { username, password, name } = parsedFormData.data;

    
    await db.insert(users).values({ username:username, password:password, name:name });

    console.log("User inserted:", name);
    redirect('/teacher_dashboard/exams');
}
