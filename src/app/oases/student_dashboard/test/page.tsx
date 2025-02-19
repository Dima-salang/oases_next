import { redirect } from "next/navigation";
import { getTests } from "./actions";
import { auth } from '@/auth';
export default async function ExamList() {

    const users = await getTests();
    const session = await auth();

    console.log("Session: ", session);
    
    if (!session) { 
        console.log("No session found");
        redirect('/login');
    }

    return (
        <div>
            {session?.user ? (
                <h1>Hello there, {session.user.name}</h1>
            ) : (
                <h1>Not logged in</h1>
            )}
            <h1>Exam List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}