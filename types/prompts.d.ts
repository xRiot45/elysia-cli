declare module 'prompts';

export interface Options {
    prettier: boolean;
    eslint: boolean;
    git: boolean;
    gitRepositoryUrl?: string;
    husky?: boolean;
}
