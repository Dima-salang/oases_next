'use server';

import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
export async function getTests() {
    const users = await sql`SELECT * FROM users`;

    return users;
}