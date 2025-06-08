import prompts from 'prompts';

export async function askOptions() {
    return await prompts([
        {
            type: 'confirm',
            name: 'prettier',
            message: 'Use Prettier for code formatting? (recommended)',
            initial: true,
        },
        {
            type: 'confirm',
            name: 'eslint',
            message: 'Use Eslint for code linting? (recommended)',
            initial: true,
        },
        // {
        //     type: 'confirm',
        //     name: 'git',
        //     message: 'Use Husky and Commit lint for commit linting? (recommended)',
        //     initial: true,
        // },
        // {
        //     type: 'confirm',
        //     name: 'husky',
        //     message: 'Initialize Git repository?',
        //     initial: false,
        // },
    ]);
}
