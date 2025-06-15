import ora from 'ora';

type SpinnerOptions = {
    text: string;
    successText?: string;
    failText?: string;
};

export async function withSpinner<T>(options: SpinnerOptions, fn: () => Promise<T>): Promise<T | null> {
    const spinner = ora(options.text).start();

    try {
        const result = await fn();
        spinner.succeed(options.successText ?? 'Done!');
        return result;
    } catch (err) {
        spinner.fail(options.failText ?? 'Something went wrong.');
        console.error(err);
        return null;
    }
}
