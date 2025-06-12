import enquirer from 'enquirer';
import { Options } from '../types/prompts';

export async function askOptions(): Promise<Options> {
    const { prompt } = enquirer;
    const baseAnswers = await prompt<Options>([
        {
            type: 'confirm',
            name: 'prettier',
            message: 'Use Prettier for code formatting? (recommended)',
            initial: true,
        },
        {
            type: 'confirm',
            name: 'eslint',
            message: 'Use ESLint for code linting? (recommended)',
            initial: true,
        },
        {
            type: 'confirm',
            name: 'git',
            message: 'Initialize Git repository?',
            initial: true,
        },
        {
            type: 'confirm',
            name: 'husky',
            message: 'Enable Husky for Git hooks automation & commit lint for conventional commits?',
            initial: true,
        },
        {
            type: 'select',
            name: 'database',
            message: 'Choose a database:',
            choices: [{ name: 'mysql', message: 'MySQL' }],
            initial: 0,
        },
        {
            type: 'select',
            name: 'orm',
            message: 'Choose an ORM:',
            choices: [{ name: 'drizzle', message: 'Drizzle ORM' }],
            initial: 0,
        },
    ]);

    let gitRepositoryUrl: string | undefined;

    if (baseAnswers.git) {
        const repoAnswer = await prompt<{ gitRepositoryUrl: string }>([
            {
                type: 'input',
                name: 'gitRepositoryUrl',
                message: 'Enter GitHub repository URL: ',
                validate: (input: string) =>
                    /^https:\/\/github\.com\/.+\/.+\.git$/.test(input) ? true : 'Enter a valid GitHub repository URL!',
            },
        ]);
        gitRepositoryUrl = repoAnswer.gitRepositoryUrl;
        if (gitRepositoryUrl.startsWith('https://')) {
            console.log(
                '\n⚠️ Note: For HTTPS URLs, use your Personal Access Token (PAT) as the password when Git asks for authentication.\n' +
                    'Learn more: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
            );
        }
    }

    return {
        ...baseAnswers,
        gitRepositoryUrl,
    };
}
