import useClientPlugin from "@naverpay/eslint-plugin-use-client";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      "use-client": useClientPlugin,
    },
    rules: {
      "use-client/use-client-hook": "error",
      "use-client/browser-api": "error",
      "use-client/event-handler": "error",
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
