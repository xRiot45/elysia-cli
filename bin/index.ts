#!/usr/bin/env bun
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
            console.error('❌ Please provide a project name.');
            process.exit(1);
        }

        await newProject(projectName);

        console.log('✅ Project setup complete!');
    });

// TODO: Generate file
program
    .command('generate <schematic> <fileName>')
    .description('Generate a new file')
    .action(async (schematic: string, fileName: string) => {
        if (!schematic || !fileName) {
            console.error('❌ Please provide a file type and name.');
            process.exit(1);
        }

        await generateFile(schematic, fileName);

        console.log(`✅ File ${schematic} ${fileName} generated successfully!`);
    });

// TODO: Display information about elysia cli
program.option('-i, --info', 'Display information about elysia-cli').action(() => {
    process.stdout.write(`Name: ${packageJson.name}\n`);
    process.stdout.write(`Version: ${packageJson.version}\n`);
    process.stdout.write(`Author: ${packageJson.author}\n`);
    process.stdout.write(`Description: ${packageJson.description}\n`);
    process.stdout.write(`License: ${packageJson.license}\n`);
});

// TODO: Display schematics
program.on('--help', () => {
    console.log('\nSchematics:');
    for (const [cmd, desc] of Object.entries(schematics)) {
        console.log(`  ${cmd.padEnd(10)} \t\t${desc}`);
    }
});

program.parse(process.argv);
