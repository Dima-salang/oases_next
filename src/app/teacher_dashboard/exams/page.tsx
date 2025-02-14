import { neon } from '@neondatabase/serverless';
import { createTest } from './actions';

export default function examForm() {
    
    
    return (
        <div>
            <h1>User Form</h1>
            <form action={createTest}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="user_id" placeholder="User ID" />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}