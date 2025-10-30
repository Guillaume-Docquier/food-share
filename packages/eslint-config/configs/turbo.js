import turboPlugin from "eslint-plugin-turbo"
import onlyWarn from "eslint-plugin-only-warn"

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const turbo = {
  name: "eslint-config-turbo",
  ignores: ["dist/**"],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    turbo: turboPlugin,
    onlyWarn,
  },
  rules: {
    "turbo/no-undeclared-env-vars": "warn",
  },
}
