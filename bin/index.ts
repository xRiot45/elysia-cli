#!/usr/bin/env bun
import { newProject } from '../commands/new';

const [, , command, ...args] = process.argv;

if (command === 'new') {
    const projectName = args[0];
    if (!projectName) {
        console.log('❌ Please provide a project name.');
        process.exit(1);
    }
    await newProject(projectName);
} else {
    console.log('Unknown command:', command);
}
