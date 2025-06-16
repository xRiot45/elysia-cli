import chalk from 'chalk';
import enquirer from 'enquirer';
import fs from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import Handlebars from 'handlebars';
import ora from 'ora';
import { join } from 'path';
import { folders } from '../constants/folders';
import { setupDrizzleOrm } from '../libs/orm/setupDrizzleOrm';
import { setupDatabase } from '../libs/setupDatabase';
import { setupEslint } from '../libs/setupEslint';
import { setupGit } from '../libs/setupGit';
import { setupHusky } from '../libs/setupHusky';
import { setupPrettier } from '../libs/setupPrettier';
import { envTemplate } from '../templates/env/env-template';
import { Options } from '../types/prompts';
import centerText from '../utils/centerText';
import { logError, logSuccess } from '../utils/logger';
import { askOptions } from '../utils/prompts';
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

    for (const folder of folders) {
        const basePath = join(projectPath, 'src', folder);
        await mkdir(join(projectPath, 'src', folder), { recursive: true });

        if (folder === 'database') {
            await mkdir(join(basePath, 'models'), { recursive: true });
        }
    }

    // TODO: Create default index.d.ts file
    const typesPath = join(projectPath, 'src', 'types', 'index.d.ts');
    const templateTypes = join(__dirname, '../templates/file/types-template.hbs');
    const templateSource = await readFile(templateTypes, 'utf8');
    const template = Handlebars.compile(templateSource);
    const typesContent = template({});
    await writeFile(typesPath, typesContent);

    // TODO: Setup Prettier
    if (options.prettier) {
        await setupPrettier(projectPath);
    }

    // TODO: Setup EsLint
    if (options.eslint) {
        await setupEslint(projectPath);
    }

    // TODO: Initialize Git
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
                process.stdout.write(
                    '\n⚠️ Reminder: If you are using HTTPS, GitHub requires a Personal Access Token (PAT) as the password, not your GitHub account password.\n' +
                        'You can generate a PAT here: https://github.com/settings/tokens',
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

    // TODO: Setup Husky
    if (options.husky) {
        await setupHusky(projectPath);
    }

    // TODO: Setup Database
    if (options.database === 'mysql') {
        await setupDatabase(projectPath, options.database);
    }

    // TODO: Setup Orm
    if (options.orm === 'drizzle') {
        await setupDrizzleOrm(projectPath, options.database);
    }

    // TODO: Setup .env file
    await writeFile(join(projectPath, '.env'), envTemplate);

    // TODO: Setup index.ts file
    const indexPath = join(projectPath, 'src', 'index.ts');
    const indexTemplatePath = join(__dirname, '../templates/file/index-template.hbs');
    const indexTemplateSource = await readFile(indexTemplatePath, 'utf8');
    const indexTemplate = Handlebars.compile(indexTemplateSource);
    const indexContent = indexTemplate({});
    await writeFile(indexPath, indexContent);

    // TODO: Update package.json
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
