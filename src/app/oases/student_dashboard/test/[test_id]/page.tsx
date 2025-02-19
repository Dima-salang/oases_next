export default async function Test({ params, }: { params: Promise<{test_id: string}>}) {
    const test_id = (await params).test_id;
    return (
        <div>
            <h1>{test_id}</h1>
        </div>
    );
}