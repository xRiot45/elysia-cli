import { fileURLToPath } from 'bun';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';

export function readPackageJson() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packagePath = join(__dirname, '..', 'package.json');
    const content = readFileSync(packagePath, 'utf-8');
    return JSON.parse(content);
}
