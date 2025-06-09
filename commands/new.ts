import enquirer from 'enquirer';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { folders } from '../constants/folders';
import { setupEslint } from '../libs/setupEslint';
import { setupGit } from '../libs/setupGit';
import { setupHusky } from '../libs/setupHusky';
import { setupPrettier } from '../libs/setupPrettier';
import { Options } from '../types/prompts';
import { askOptions } from '../utils/prompts';
import { runCommand } from '../utils/runCommand';

export async function newProject(name: string) {
    const { prompt } = enquirer;
    const projectPath = join(process.cwd(), name);

    await runCommand(['bun', 'create', 'elysia', name], process.cwd());

    const options: Options = await askOptions();

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
        setupGit(projectPath, {
            gitRepositoryUrl: options.gitRepositoryUrl,
        });

        if (options.gitRepositoryUrl) {
            const { doPush } = await prompt<{ doPush: boolean }>([
                {
                    type: 'confirm',
                    name: 'doPush',
                    message: 'Do you want to push the project to the remote repository?',
                    initial: true,
                },
            ]);

            if (options.gitRepositoryUrl?.startsWith('https://')) {
                console.log(
                    '\n⚠️ Reminder: If you are using HTTPS, GitHub requires a Personal Access Token (PAT) as the password, not your GitHub account password.\n' +
                        'You can generate a PAT here: https://github.com/settings/tokens',
                );
            }

            if (doPush) {
                await runCommand(['git', 'push', '-u', 'origin', 'main'], projectPath);
                console.log('🚀 Project pushed to GitHub successfully!');
            }
        }
    }

    // Setup Husky
    if (options.husky) {
        await setupHusky(projectPath);
    }

    // Update package.json
    const pkgPath = join(projectPath, 'package.json');
    const pkgJson = JSON.parse(await readFile(pkgPath, 'utf-8'));
    pkgJson.name = name;

    pkgJson.scripts = {
        ...pkgJson.scripts,
        test: 'echo "Error: no test specified" && exit 1',
        dev: 'bun run --watch src/index.ts',
        build: 'bun build src/index.ts --outdir dist',
        format: 'prettier --write src/**/*.{ts}',
        lint: 'eslint src/**/*.{ts}',
    };

    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));

    console.log(`✅ Project "${name}" created successfully.`);
}
