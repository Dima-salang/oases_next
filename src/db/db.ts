// src/db.ts
import { drizzle} from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { redirect } from "next/navigation";
import { users } from "./schema";
import { createUserSchema, signInSchema } from "@/app/zod";
import bcrypt from "bcryptjs";
config({ path: ".env" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });



export async function createUser(formData: FormData) {
    
    const formDataObject = Object.fromEntries(formData.entries());
    const parsedFormData = createUserSchema.safeParse(formDataObject);
    if (!parsedFormData.success) {
        throw new Error(parsedFormData.error.message);
    }

    const { username, password, name } = parsedFormData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({ username:username, password:hashedPassword, name:name });

    console.log("User inserted:", name);
    redirect('/teacher_dashboard/exams');
}


export async function getUser({ username, password }: { username: string; password: string }) {
    
    const parsedForm = signInSchema.safeParse({ username, password });
    if (!parsedForm.success) {
        throw new Error(parsedForm.error.message);
    }
    const user = await db.select().from(users).where(eq(users.username, parsedForm.data.username));
    if (!user) {
        throw new Error("Incorrect username or password. Please try again.");
    }

    const userPassword = user[0].password;

    const isPasswordMatch = await bcrypt.compare(parsedForm.data.password, userPassword);

    if (!isPasswordMatch) {
        throw new Error("Incorrect username or password. Please try again.");
    }
    return user[0];
    
}