import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function setupSwagger(projectPath: string) {
    await withSpinner(
        {
            text: 'Installing swagger package...',
            successText: 'Swagger installed successfully for API documentation.',
            failText: 'Failed to install swagger package.',
        },
        async () => {
            await runCommand(['bun', 'add', '@elysiajs/swagger'], projectPath, true);
        },
    );
}
