"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/lib/types/todos";

/**
 * Props for TodoItem component
 */
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Client component for displaying a single todo item
 */
export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        id={todo.id}
      />
      <label
        htmlFor={todo.id}
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="outline"
        onClick={() => onRemove(todo.id)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 text-sm"
      >
        Delete
      </Button>
    </div>
  );
}
