// This file is for testing our custom ESLint rule

export async function testFunction() {
  "use server"; // This should trigger our linting rule
  return { success: true };
}
