import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", "airbnb-base"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.mocha },
    },
  },
  {
    files: ["babel.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
