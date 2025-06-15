import fs from 'fs/promises';
import path from 'path';
import { logSuccess } from '../utils/logger';
import { runCommand } from '../utils/runCommand';

export async function setupDatabase(projectPath: string, database: string) {
    if (database === 'mysql') {
        await runCommand(['bun', 'add', 'mysql2'], projectPath);

        const configContent = `
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
        
export const connectDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
        
    return drizzle(connection);
};
        
export const db = await connectDatabase();
        `;

        const configPath = path.join(projectPath, 'src/configs/database.config.ts');
        await fs.writeFile(configPath, configContent, 'utf8');

        logSuccess('Database configured');
    }
}
