import { getTests } from "./actions";

export default async function ExamList() {

    const users = await getTests();

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