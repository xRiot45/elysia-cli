import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../../utils/runCommand';

export async function setupDrizzleOrm(projectPath: string, database: string) {
    await runCommand(['bun', 'add', 'drizzle-orm'], projectPath);
    await runCommand(['bun', 'add', 'drizzle-typebox'], projectPath);
    await runCommand(['bun', 'add', 'drizzle-kit'], projectPath);

    const drizzleConfigContent = `
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: '${database}',
    schema: './src/database/models/*.ts',
    out: './drizzle',
    dbCredentials: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
    },
});
    `;

    await writeFile(join(projectPath, 'drizzle.config.ts'), drizzleConfigContent);

    // update package.json
    const packageJsonPath = join(projectPath, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    packageJson.scripts = {
        ...packageJson.scripts,
        migrate: 'drizzle-kit push',
        generate: 'drizzle-kit generate',
    };
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    chalk.green('✅ drizzle-orm installed and drizzle.config.ts created');
}
