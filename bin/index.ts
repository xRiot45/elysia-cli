#!/usr/bin/env bun
import { $ } from 'bun';
import chalk from 'chalk';
import { Command } from 'commander';
import { generateFile } from '../commands/generateFile';
import { newProject } from '../commands/new';
import { schematics } from '../constants/schematics';
import { readPackageJson } from '../utils/readPackageJson';

const program = new Command();
const packageJson = readPackageJson();

// TODO: Display version and help
program
    .name('elysia')
    .version(packageJson.version, '-v, --version', 'Display the current version of elysia-cli')
    .helpOption('-h, --help', 'Display help for command');

// TODO: Create new project
program
    .command('new <projectName>')
    .description('Create a new project with Elysia JS Framework')
    .action(async (projectName: string) => {
        if (!projectName) {
            chalk.red('❌ Please provide a project name.');
            process.exit(1);
        }

        await newProject(projectName);
    });

// TODO: Generate file
program
    .command('generate <schematic> <fileName>')
    .description('Generate a new file')
    .action(async (schematic: string, fileName: string) => {
        if (!schematic || !fileName) {
            chalk.red('❌ Please provide a file type and name.');
            process.exit(1);
        }

        await generateFile(schematic, fileName)
            .then(() => process.exit(0))
            .catch(() => process.exit(1));
    });

// TODO: Display information about elysia cli
program.option('-i, --info', 'Display information about elysia-cli').action(() => {
    process.stdout.write(`Name: ${packageJson.name}\n`);
    process.stdout.write(`Version: ${packageJson.version}\n`);
    process.stdout.write(`Author: ${packageJson.author}\n`);
    process.stdout.write(`Description: ${packageJson.description}\n`);
    process.stdout.write(`License: ${packageJson.license}\n`);
});

// TODO: Update elysia cli
program.option('-u, --update', 'Update elysia-js-cli').action(async () => {
    process.stdout.write(`Updating elysia-js-cli...\n`);
    try {
        await $`bun add -g ${packageJson.name}@latest`;
        process.stdout.write(chalk.green('\n Update completed successfully!'));
    } catch (error) {
        console.error(chalk.red('\n❌ Failed to update elysia-js-cli.'));
        console.error(error);
        process.exit(1);
    }
    process.exit(0);
});

// TODO: Display schematics
program.on('--help', () => {
    process.stdout.write(chalk.bold('\nSchematics:\n'));

    const maxLength = Math.max(...Object.keys(schematics).map((k) => k.length));

    for (const [cmd, desc] of Object.entries(schematics)) {
        const padded = cmd.padEnd(maxLength + 2);
        process.stdout.write(`  ${chalk.green(padded)}${desc}\n`);
    }
});

program.parse(process.argv);
