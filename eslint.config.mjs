// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	globalIgnores(["eslint.config.mjs"]),
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		files: ["**/*.ts"],
		rules: {
			camelcase: "warn",
			"max-params": ["error", 4],
			"no-console": "error",
			"no-var": "error",
			"eol-last": "error",
		},
	}
);
