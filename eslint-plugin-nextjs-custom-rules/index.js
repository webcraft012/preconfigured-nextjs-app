/**
 * @fileoverview Custom ESLint rules for Next.js
 */

"use strict";

module.exports = {
  rules: {
    "no-inline-directives": require("./lib/rules/no-inline-directives"),
  },
};
