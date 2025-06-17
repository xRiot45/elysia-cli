import chalk from 'chalk';
import enquirer from 'enquirer';
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import ora from 'ora';
import { join } from 'path';
import { setupRestApiProject } from '../libs/project-types/restApi';
import { setupGit } from '../libs/setupGit';
import { askOptions } from '../prompts';
import { Options } from '../types/prompts';
import centerText from '../utils/centerText';
import { logError, logSuccess } from '../utils/logger';
import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function newProject(name: string) {
    const { prompt } = enquirer;
    const projectPath = join(process.cwd(), name);
    const spinner = ora();

    if (fs.existsSync(projectPath)) {
        logError(`Project "${name}" already exists at path "${projectPath}".\n`);
        return;
    }

    await runCommand(['bun', 'create', 'elysia', name], process.cwd(), true);

    const options: Options = await askOptions();
    process.stdout.write('\n');

    switch (options.projectType) {
        case 'rest-api':
            await setupRestApiProject(projectPath, name, options);
            break;
        default:
            throw new Error(`Unknown project type: ${options.projectType}`);
    }

    if (options.git) {
        await setupGit(projectPath, {
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
                process.stdout.write(
                    '\n⚠️ Reminder: If you are using HTTPS, GitHub requires a Personal Access Token (PAT) as the password.\n' +
                        'Generate one here: https://github.com/settings/tokens\n',
                );
            }

            if (doPush) {
                await withSpinner(
                    {
                        text: 'Pushing project to GitHub...',
                        successText: 'Project pushed to GitHub successfully!',
                        failText: 'Failed to push project to GitHub.',
                    },
                    async () => {
                        await runCommand(['git', 'push', '-u', 'origin', 'main'], projectPath, true);
                    },
                );

                logSuccess('GitHub push completed');
            }
        }
    }

    const pkgPath = join(projectPath, 'package.json');
    const pkgJson = JSON.parse(await readFile(pkgPath, 'utf-8'));
    pkgJson.name = name;
    pkgJson.type = 'module';
    pkgJson.scripts = {
        ...pkgJson.scripts,
        test: 'echo "Error: no test specified" && exit 1',
        dev: 'bun run --watch src/index.ts',
        build: 'bun build src/index.ts --outdir dist',
        format: 'prettier --write "**/*.ts"',
        lint: 'eslint "**/*.ts" --fix',
    };
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));

    process.stdout.write('\n');
    spinner.succeed(chalk.green(`Project ${name} created! 🎉 `));
    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n$ cd ${name}`));
    process.stdout.write(chalk.cyan(`\n$ bun run format`));
    process.stdout.write(chalk.cyan(`\n$ bun run dev\n`));
    process.stdout.write('\n\n');
    process.stdout.write(chalk.green(centerText('Thank you for using Elysia CLI!')) + '\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
}
