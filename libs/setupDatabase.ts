import { runCommand } from '../utils/runCommand';

export async function setupDatabase(projectPath: string, database: string) {
    if (database === 'mysql') {
        await runCommand(['bun', 'add', 'mysql2'], projectPath);
    }
}
