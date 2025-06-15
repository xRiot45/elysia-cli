import chalk from 'chalk';

export const logSuccess = (msg: string) => process.stdout.write(chalk.green(`✅ ${msg}`));
export const logError = (msg: string) => process.stdout.write(chalk.red(`❌ ${msg}`));
export const logInfo = (msg: string) => process.stdout.write(chalk.cyan(`ℹ️ ${msg}`));
