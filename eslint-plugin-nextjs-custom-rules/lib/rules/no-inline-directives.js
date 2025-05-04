/**
 * @fileoverview Rule to prevent 'use server' and 'use client' directives from being used anywhere except at the top of the file
 * @author Custom ESLint Plugin
 */

"use strict";

// Rule definition
const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent 'use server' and 'use client' directives from being used anywhere except at the top of the file",
      category: "Possible Errors",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noInlineDirective:
        "It is not allowed to define inline '{{directive}}' directives. '{{directive}}' must be at the top of the file.",
    },
  },

  create(context) {
    // Function to check if a node is at the top level as the first statement
    function isFirstTopLevelStatement(node) {
      const ancestors = context.getAncestors();

      // If there are no ancestors, this can't be in an expression statement
      if (ancestors.length === 0) return false;

      // Get the parent node (should be an ExpressionStatement)
      const parent = ancestors[ancestors.length - 1];
      if (parent.type !== "ExpressionStatement") return false;

      // Get the program node (should be the grandparent)
      if (ancestors.length < 2) return false;
      const program = ancestors[ancestors.length - 2];
      if (program.type !== "Program") return false;

      // Check if this is the first statement in the program
      return program.body[0] === parent;
    }

    // Function to report an error for a directive
    function reportInlineDirective(node, directive) {
      context.report({
        node,
        messageId: "noInlineDirective",
        data: {
          directive,
        },
      });
    }

    return {
      // Check for string literals containing directives
      Literal(node) {
        if (node.value === "use server" || node.value === "use client") {
          // If it's not the first top-level statement, report it
          if (!isFirstTopLevelStatement(node)) {
            reportInlineDirective(node, node.value);
          }
        }
      },

      // Check for template literals containing directives
      TemplateLiteral(node) {
        if (node.quasis.length === 1) {
          const value = node.quasis[0].value.raw;
          if (value === "use server" || value === "use client") {
            // If it's not the first top-level statement, report it
            if (!isFirstTopLevelStatement(node)) {
              reportInlineDirective(node, value);
            }
          }
        }
      },
    };
  },
};

module.exports = rule;
