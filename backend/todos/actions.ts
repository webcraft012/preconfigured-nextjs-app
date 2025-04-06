"use server";

import { revalidatePath } from "next/cache";

/**
 * Simple in-memory storage for todos
 * In a real app, this would be a database
 */
let todos: { id: string; text: string; completed: boolean }[] = [];

/**
 * Adds a new todo
 */
export async function addTodo(text: string) {
  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  revalidatePath("/");
  return todos;
}

/**
 * Toggles a todo's completion status
 */
export async function toggleTodo(id: string) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  revalidatePath("/");
  return todos;
}

/**
 * Removes a todo
 */
export async function removeTodo(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
  revalidatePath("/");
  return todos;
}

/**
 * Gets all todos
 */
export async function getTodos() {
  return todos;
}
