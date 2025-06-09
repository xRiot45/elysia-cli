import { runCommand } from '../utils/runCommand';

export async function setupGit(projectPath: string, options: { gitRepositoryUrl?: string }) {
    await runCommand(['git', 'init'], projectPath);
    await runCommand(['git', 'add', '.'], projectPath);
    await runCommand(['git', 'commit', '-m', `feat: setup base project with Elysia and Bun`], projectPath);
    await runCommand(['git', 'branch', '-M', 'main'], projectPath);

    if (options.gitRepositoryUrl) {
        await runCommand(['git', 'remote', 'add', 'origin', options.gitRepositoryUrl], projectPath);
    }
}
