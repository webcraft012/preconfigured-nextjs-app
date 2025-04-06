import {
  getTodos,
  addTodo,
  toggleTodo,
  removeTodo,
} from "@/backend/todos/actions";
import { TodoItem } from "@/components/todos/TodoItem";
import { TodoInput } from "@/components/todos/TodoInput";

/**
 * Server component for displaying the todo list
 */
export default async function TodoList() {
  const todos = await getTodos();

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      <TodoInput onAdd={addTodo} />
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}
