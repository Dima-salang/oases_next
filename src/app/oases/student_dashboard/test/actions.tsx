'use server';

import {neon} from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {users} from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
export async function getTests() {
    const createdUsers = await db.select().from(users);
    console.log(createdUsers);
    return createdUsers;
}