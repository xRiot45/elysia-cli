export async function runCommand(cmd: string[], cwd?: string) {
    const proc = Bun.spawn({
        cmd,
        cwd,
    });
    const exitCode = await proc.exited;
    if (exitCode !== 0) {
        throw new Error(`Command "${cmd.join(' ')}" failed with exit code ${exitCode}`);
    }
}
