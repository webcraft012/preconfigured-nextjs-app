/**
 * @fileoverview Rule to prevent inline 'use server' directives in client components
 * @author Custom ESLint Plugin
 */

/**
 * Determines if a file is likely a client component based on naming conventions or other heuristics
 * This is a simplified check - you may need to enhance it for your specific project structure
 */
function isClientComponent(context) {
  const filename = context.getFilename();
  const sourceCode = context.getSourceCode();
  const comments = sourceCode.getAllComments();
  const text = sourceCode.getText();

  // Check if the file has a 'use client' directive at the top
  const hasUseClientDirective =
    text.trim().startsWith("'use client'") ||
    text.trim().startsWith('"use client"') ||
    comments.some(
      (comment) =>
        comment.value.includes("use client") && comment.loc.start.line <= 3
    ); // Check first few lines

  if (hasUseClientDirective) {
    return true;
  }

  // Check for known client component patterns
  // Adjust these patterns based on your project's conventions
  if (filename.includes("components/") && !filename.includes(".server.")) {
    return true;
  }

  return false;
}

const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        'Prevent inline "use server" directives in client components',
      category: "Possible Errors",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noInlineUseServer:
        'It is not allowed to define inline "use server" annotated Server Actions in Client Components. Export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.',
    },
  },

  create(context) {
    return {
      Literal(node) {
        // Check if this is a 'use server' directive
        if (node.value === "use server") {
          // If it's in a client component, report an error
          if (isClientComponent(context)) {
            context.report({
              node,
              messageId: "noInlineUseServer",
            });
          }
        }
      },

      // Also catch template literals that might contain 'use server'
      TemplateLiteral(node) {
        if (
          node.quasis.length === 1 &&
          node.quasis[0].value.raw === "use server"
        ) {
          if (isClientComponent(context)) {
            context.report({
              node,
              messageId: "noInlineUseServer",
            });
          }
        }
      },
    };
  },
};

export default rule;
