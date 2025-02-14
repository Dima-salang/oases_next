import { neon } from '@neondatabase/serverless';

export default async function ExamList() {

    'use server';
    const sql = neon(process.env.DATABASE_URL!);
    const users = await sql`SELECT * FROM users`;

    return (
        <div>
            <h1>Exam List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}