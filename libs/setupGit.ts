import { runCommand } from '../utils/runCommand';
import { withSpinner } from '../utils/spinner';

export async function setupGit(projectPath: string, options: { gitRepositoryUrl?: string }) {
    await withSpinner(
        {
            text: 'Initializing Git repository...',
            successText: 'Git repository initialized!',
            failText: 'Failed to initialize Git.',
        },
        async () => {
            await runCommand(['git', 'init'], projectPath, true);
            await runCommand(['git', 'add', '.'], projectPath, true);
            await runCommand(
                ['git', 'commit', '-m', 'feat: setup base project with Elysia and Bun'],
                projectPath,
                true,
            );
            await runCommand(['git', 'branch', '-M', 'main'], projectPath, true);
        },
    );

    if (options.gitRepositoryUrl) {
        await withSpinner(
            {
                text: 'Setting remote Git origin...',
                successText: 'Remote origin set!',
                failText: 'Failed to set remote origin.',
            },
            async () => {
                await runCommand(['git', 'remote', 'add', 'origin', options.gitRepositoryUrl!], projectPath);
            },
        );
    }
}
