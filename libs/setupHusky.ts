import { chmod, writeFile } from 'fs/promises';
import path from 'path';
import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function setupHusky(projectPath: string) {
    // Step 1: Install packages
    await withSpinner(
        {
            text: 'Installing Husky and Commitlint...',
            successText: 'Husky & Commitlint installed to manage commit message standards.',
            failText: 'Failed to install Husky or Commitlint.',
        },
        async () => {
            await runCommand(
                ['bun', 'add', '-D', 'husky', '@commitlint/cli', '@commitlint/config-conventional'],
                projectPath,
                true,
            );
        },
    );

    // Step 2: Initialize Husky
    await withSpinner(
        {
            text: 'Initializing Husky...',
            successText: 'Husky initialized to enable Git hooks.',
            failText: 'Failed to initialize Husky.',
        },
        async () => {
            await runCommand(['bunx', 'husky', 'init'], projectPath, true);
        },
    );

    // Step 3: Create pre-commit hook
    const preCommitPath = path.join(projectPath, '.husky/pre-commit');
    await writeFile(
        preCommitPath,
        `#!/bin/sh
  bun run format && bun run lint || exit 1
  `,
    );
    await chmod(preCommitPath, 0o755);

    // Step 4: Create commit-msg hook
    const commitMsgPath = path.join(projectPath, '.husky/commit-msg');
    await writeFile(
        commitMsgPath,
        `#!/bin/sh
  bunx commitlint --edit "$1"
  `,
    );
    await chmod(commitMsgPath, 0o755);

    // Step 5: Write commitlint config
    await writeFile(
        path.join(projectPath, 'commitlint.config.js'),
        `export default { extends: ['@commitlint/config-conventional'] };`,
    );
}
