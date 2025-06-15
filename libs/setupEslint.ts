import { writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function setupEslint(projectPath: string) {
    await withSpinner(
        {
            text: 'Installing ESLint packages...',
            successText: 'ESLint packages installed successfully!',
            failText: 'Failed to install ESLint packages.',
        },
        async () => {
            await runCommand(['bun', 'add', '-D', 'eslint', '@eslint/js', 'globals', 'typescript-eslint'], projectPath);
        },
    );

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
