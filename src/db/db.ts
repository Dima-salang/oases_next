"use server";
import { drizzle} from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { users, students, teachers } from "./schema";
import { createStudentSchema, signInSchema } from "@/app/zod";
import bcrypt from "bcryptjs";
import { ROUTES } from "@/routes";


const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);





export async function createUser(formData: FormData) {
    
    const formDataObject = Object.fromEntries(formData.entries());
    const parsedFormData = createStudentSchema.safeParse(formDataObject);
    if (!parsedFormData.success) {
        throw new Error(parsedFormData.error.message);
    }

    const { student_id, username, password, name } = parsedFormData.data; // get the data from the form

    console.log(student_id, username, password, name);
    // check if the user already exists in the database
    const user = await db.select().from(users).where(eq(users.username, username));
    if (user.length > 0) {
        throw new Error("Username already exists. Please choose a different username.");
    }
    const student_id_int = Number(student_id);

    const student = await db.select().from(students).where(eq(students.student_id, student_id_int));
    if (student.length > 0) {
        throw new Error("Student ID already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    // insert the user into db
    await db.insert(users).values({ username:username, password:hashedPassword, name:name });

    // get the new user from the db
    const insertedUser = await db.select().from(users).where(eq(users.username, username));

    // TO-DO: HANDLE CREATION OF USER AND TEACHER ACCOUNTS
    await db.insert(students).values({ student_id:student_id_int, user_id:insertedUser[0].id });


    console.log("User inserted:", name);
    redirect(`${ROUTES.STUDENT_DASHBOARD}/test`);
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


export async function getUserRole(userID: string) {
    const student = await db.select().from(students).where(eq(students.user_id, userID));
    if (student) {
        return "student";
    }

    const teacher = await db.select().from(teachers).where(eq(teachers.user_id, userID));
    if (teacher) {
        return "teacher";
    }

    return null;
}