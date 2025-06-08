import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { folders } from '../constants/folders';
import { setupEslint } from '../libs/setupEslint';
import { setupPrettier } from '../libs/setupPrettier';
import { askOptions } from '../utils/prompts';
import { runCommand } from '../utils/runCommand';

export async function newProject(name: string) {
    const projectPath = join(process.cwd(), name);

    await runCommand(['bun', 'create', 'elysia', name], process.cwd());

    const options = await askOptions();

    for (const folder of folders) {
        await mkdir(join(projectPath, 'src', folder), { recursive: true });
    }

    // Setup Prettier
    if (options.prettier) {
        await setupPrettier(projectPath);
    }

    // Setup EsLint
    if (options.eslint) {
        await setupEslint(projectPath);
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

    console.log(`✅ Project "${name}" created successfully.`);
}
