import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../../utils/runCommand';
import { withSpinner } from '../../utils/spinner';

export async function setupDrizzleOrm(projectPath: string, database: string) {
    // Step 1: Install packages with spinner
    await withSpinner(
        {
            text: 'Installing drizzle ORM packages...',
            successText: 'drizzle-orm packages installed!',
            failText: 'Failed to install drizzle-orm packages.',
        },
        async () => {
            await runCommand(['bun', 'add', 'drizzle-orm'], projectPath);
            await runCommand(['bun', 'add', 'drizzle-typebox'], projectPath);
            await runCommand(['bun', 'add', 'drizzle-kit'], projectPath);
        },
    );

    // Step 2: Create drizzle.config.ts
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
  `.trimStart();

    await writeFile(join(projectPath, 'drizzle.config.ts'), drizzleConfigContent);

    // Step 3: Add scripts to package.json
    const packageJsonPath = join(projectPath, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    packageJson.scripts = {
        ...packageJson.scripts,
        migrate: 'drizzle-kit push',
        generate: 'drizzle-kit generate',
    };
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
