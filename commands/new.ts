import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { folders } from '../constants/folders';
import { askOptions } from '../utils/prompts';
import { runCommand } from '../utils/runCommand';

export async function newProject(name: string) {
    const projectPath = join(process.cwd(), name);

    // Buat project Elysia langsung dengan nama sesuai
    await runCommand(['bun', 'create', 'elysia', name], process.cwd());

    const options = await askOptions();

    // Buat folder tambahan di dalam src/
    for (const folder of folders) {
        await mkdir(join(projectPath, 'src', folder), { recursive: true });
    }

    // Setup Prettier
    if (options.prettier) {
        await writeFile(
            join(projectPath, '.prettierrc'),
            JSON.stringify(
                {
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'all',
                },
                null,
                2,
            ),
        );

        await runCommand(['bun', 'add', '-D', 'prettier'], projectPath);
    }

    // Setup EsLint
    if (options.eslint) {
        await runCommand(['bun', 'add', '-D', 'eslint'], projectPath);
        await runCommand(['bunx', 'eslint', '--init'], projectPath);
    }

    // Initialize Git
    if (options.git) {
        await runCommand(['git', 'init'], projectPath);
        await runCommand(['git', 'add', '.'], projectPath);
        await runCommand(['git', 'commit', '-m', `feat: setup project ${name}`], projectPath);
    }

    // Setup Husky & Commitlint
    if (options.husky) {
        await runCommand(
            ['bun', 'add', '-D', 'husky', '@commitlint/cli', '@commitlint/config-conventional'],
            projectPath,
        );
        await runCommand(['bunx', 'husky', 'install'], projectPath);

        await writeFile(
            join(projectPath, 'commitlint.config.js'),
            'module.exports = { extends: ["@commitlint/config-conventional"] };',
        );

        await runCommand(['bunx', 'husky', 'add', '.husky/commit-msg', 'bunx commitlint --edit $1'], projectPath);
    }

    // Update package.json name
    const pkgPath = join(projectPath, 'package.json');
    const pkgJson = JSON.parse(await readFile(pkgPath, 'utf-8'));
    pkgJson.name = name;
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));

    // Optional: Update README.md title
    const readmePath = join(projectPath, 'README.md');
    try {
        const readme = await readFile(readmePath, 'utf-8');
        const updatedReadme = readme.replace(/^# .*/m, `# ${name}`);
        await writeFile(readmePath, updatedReadme);
    } catch {}

    console.log(`✅ Project "${name}" created successfully.`);
}
