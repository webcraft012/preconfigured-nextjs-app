import TodoList from "./server-components/todos/TodoList";

/**
 * Main page component as an async server component.
 */
export default async function Home() {
  const todoListContent = await TodoList();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        {todoListContent}
      </div>
    </main>
  );
}
