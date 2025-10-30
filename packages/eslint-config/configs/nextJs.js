import globals from "globals"
import { react } from "./react.js"
import pluginNext from "@next/eslint-plugin-next"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJs = {
  ...react,
  name: "eslint-config-nextjs",
  ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  languageOptions: {
    ...react.languageOptions,
    globals: {
      ...globals.serviceworker,
    },
  },
  plugins: {
    ...react.plugins,
    "@next/next": pluginNext,
  },
  rules: {
    ...react.rules,
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs["core-web-vitals"].rules,
  },
}
