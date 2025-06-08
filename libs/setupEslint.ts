import { writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../utils/runCommand';

export async function setupEslint(projectPath: string) {
    await runCommand(['bun', 'add', '-D', 'eslint', '@eslint/js', 'globals', 'typescript-eslint'], projectPath);

    const eslintConfigContent = `
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
]);
`.trimStart();

    await writeFile(join(projectPath, 'eslint.config.mjs'), eslintConfigContent);
}
