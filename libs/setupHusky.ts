import { chmod, writeFile } from 'fs/promises';
import path from 'path';
import { runCommand } from '../utils/runCommand';

export async function setupHusky(projectPath: string) {
    await runCommand(['bun', 'add', '-D', 'husky', '@commitlint/cli', '@commitlint/config-conventional'], projectPath);
    await runCommand(['bunx', 'husky', 'init'], projectPath);
    const preCommitPath = path.join(projectPath, '.husky/pre-commit');
    await writeFile(
        preCommitPath,
        `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

bun run format && bun run lint && bun run test && bun run build || exit 1
`,
    );
    await chmod(preCommitPath, 0o755);

    const commitMsgPath = path.join(projectPath, '.husky/commit-msg');
    await writeFile(
        commitMsgPath,
        `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

bunx commitlint --edit "$1"
`,
    );
    await chmod(commitMsgPath, 0o755);

    await writeFile(
        path.join(projectPath, 'commitlint.config.js'),
        `export default { extends: ['@commitlint/config-conventional']};`,
    );
}
