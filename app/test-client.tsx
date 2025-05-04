// This file is for testing our custom ESLint rule with 'use client'

export function TestComponent() {
  "use client"; // This should trigger our linting rule
  return <div>Test Component</div>;
}
