declare module 'prompts';

export interface Options {
    prettier: boolean;
    eslint: boolean;
    git: boolean;
    gitRepositoryUrl?: string;
    husky?: boolean;
    commitLint?: boolean;
    database: 'mysql' | 'postgres' | 'sqlite';
    orm: 'drizzle' | 'typeorm';
    projectType: 'web-app' | 'microservice' | 'rest-api';
}
