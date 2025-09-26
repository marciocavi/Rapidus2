import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.ts"],
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
);
