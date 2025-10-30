import { defineConfig, globalIgnores } from "eslint/config"
import eslintConfigs from "@repo/eslint-config"

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  globalIgnores([...eslintConfigs.configs.turbo.ignores]),
  eslintConfigs.configs.turbo,
  eslintConfigs.configs.typescript,
  eslintConfigs.configs.react,
])
