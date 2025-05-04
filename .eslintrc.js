// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["next"],
  // Load our custom plugin
  plugins: ["@next/next", "nextjs-custom-rules"],
  rules: {
    // Use our custom rule for directive checking
    "nextjs-custom-rules/no-inline-directives": "error",
  },
  // Tell ESLint where to find our plugin
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
};
