import js from "@eslint/js";
import globals from "globals";
import importPluginX from 'eslint-plugin-import-x';
import { defineConfig } from "eslint/config";

export default defineConfig(
  [
    {
      files: ["**/*.{js,mjs,cjs}"], 
      plugins: {
        js,
        "import-x": importPluginX
      }, 
      rules: {
        "import-x/no-unresolved": "error"
      },
      extends: ["js/recommended"], 
      languageOptions: { 
        globals: {
          ...globals.browser,
          ...globals.node
        }
      }
    },
  ]
);
