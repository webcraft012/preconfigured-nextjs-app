import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Import our custom rules
import noInlineUseServerRule from "./eslint-plugin-nextjs-custom-rules/lib/rules/no-inline-use-server.mjs";
import noInlineDirectivesRule from "./eslint-plugin-nextjs-custom-rules/lib/rules/no-inline-directives.mjs";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "eslint-plugin-nextjs-custom-rules/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // Add our custom rules to prevent inline directives
      "nextjs-custom-rules/no-inline-directives": "error",
    },
    plugins: {
      "nextjs-custom-rules": {
        rules: {
          "no-inline-directives": noInlineDirectivesRule,
          "no-inline-use-server": noInlineUseServerRule,
        },
      },
    },
  },
];

export default eslintConfig;
