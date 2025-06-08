import { writeFile } from 'fs/promises';
import { join } from 'path';
import { runCommand } from '../utils/runCommand';

export async function setupPrettier(projectPath: string) {
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

    await runCommand(['bun', 'add', '-D', 'prettier'], projectPath);
}
