'use server';

import {neon} from '@neondatabase/serverless';
import {redirect} from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);
export async function createTest(formData : FormData) {
    
    const name = formData.get('name');
    const user_id = formData.get('user_id');
    const res = await sql`INSERT INTO users (name, id) VALUES (${name}, ${user_id})`;
    

    redirect('/teacher_dashboard/exams')

}