import { neon } from '@neondatabase/serverless';

export default function examForm() {
    async function createUser(formData : FormData) {
        'use server';
        const sql = neon(process.env.DATABASE_URL!);
        const name = formData.get('name');
        const user_id = formData.get('user_id');
        await sql`INSERT INTO users (name, id) VALUES (${name}, ${user_id})`;
    }
    
    return (
        <div>
            <h1>User Form</h1>
            <form action={createUser}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="user_id" placeholder="User ID" />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}