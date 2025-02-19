"use server";
import { drizzle} from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { users } from "./schema";
import { createUserSchema, signInSchema } from "@/app/zod";
import bcrypt from "bcryptjs";
import { ROUTES } from "@/routes";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);




export async function createUser(formData: FormData) {
    
    const formDataObject = Object.fromEntries(formData.entries());
    const parsedFormData = createUserSchema.safeParse(formDataObject);
    if (!parsedFormData.success) {
        throw new Error(parsedFormData.error.message);
    }

    const { username, password, name } = parsedFormData.data; // get the data from the form
    // check if the user already exists in the database
    const user = await db.select().from(users).where(eq(users.username, username));
    if (user) {
        throw new Error("Username already exists. Please choose a different username.");
    }
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    // insert the user into db
    await db.insert(users).values({ username:username, password:hashedPassword, name:name });

    // TO-DO: HANDLE CREATION OF USER AND TEACHER ACCOUNTS
    


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