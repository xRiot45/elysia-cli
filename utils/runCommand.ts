import { spawn } from 'child_process';

export async function runCommand(cmd: string[], cwd: string = process.cwd(), silent = false): Promise<void> {
    return new Promise((resolve, reject) => {
        const [command, ...args] = cmd;
        const proc = spawn(command, args, {
            cwd,
            stdio: silent ? 'ignore' : 'inherit',
        });

        proc.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command "${command}" exited with code ${code}`));
            }
        });
    });
}
