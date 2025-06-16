import { writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function setupPrettier(projectPath: string) {
    // Step 1: Create Prettier config file
    await writeFile(
        join(projectPath, '.prettierrc'),
        JSON.stringify(
            {
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 4,
                printWidth: 120,
            },
            null,
            2,
        ),
    );

    // Step 2: Install Prettier with spinner
    await withSpinner(
        {
            text: 'Installing Prettier...',
            successText: 'Prettier has been installed and is ready to format your code.',
            failText: 'Failed to install Prettier.',
        },
        async () => {
            await runCommand(['bun', 'add', '-D', 'prettier'], projectPath, true);
        },
    );
}
