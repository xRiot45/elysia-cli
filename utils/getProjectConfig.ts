import fs from 'fs';
import path from 'path';

export function getProjectConfig(): {
    useSwagger: boolean;
    useDrizzle: boolean;
    orm: string | null;
    database: string | null;
    prettier: boolean;
    eslint: boolean;
    husky: boolean;
} {
    try {
        const configPath = path.join(process.cwd(), '.elysia-cli.json');
        const raw = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return {
            useSwagger: false,
            useDrizzle: false,
            orm: null,
            database: null,
            prettier: false,
            eslint: false,
            husky: false,
        };
    }
}
