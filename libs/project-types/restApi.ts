import { mkdir, readFile, writeFile } from 'fs/promises';
import Handlebars from 'handlebars';
import { join } from 'path';
import { folders } from '../../constants/folders';
import { setupDrizzleOrm } from '../../libs/orm/setupDrizzleOrm';
import { setupEslint } from '../../libs/setupEslint';
import { setupHusky } from '../../libs/setupHusky';
import { setupPrettier } from '../../libs/setupPrettier';
import { envTemplate } from '../../templates/env/env-template';
import { Options } from '../../types/prompts';
import { setupMysqlDb } from '../database/setupMysqlDb';

export async function setupRestApiProject(projectPath: string, name: string, options: Options) {
    for (const folder of folders) {
        const basePath = join(projectPath, 'src', folder);
        await mkdir(basePath, { recursive: true });

        if (folder === 'databases') {
            await mkdir(join(basePath, 'models'), { recursive: true });
        }
    }

    // Buat types template
    const typesPath = join(projectPath, 'src', 'types', 'index.d.ts');
    const templateTypes = join(__dirname, '../../templates/file/types-template.hbs');
    const templateSource = await readFile(templateTypes, 'utf8');
    const template = Handlebars.compile(templateSource);
    const typesContent = template({});
    await writeFile(typesPath, typesContent);

    if (options.prettier) await setupPrettier(projectPath);
    if (options.eslint) await setupEslint(projectPath);
    if (options.husky) await setupHusky(projectPath);
    if (options.database) {
        if (options.database === 'mysql') await setupMysqlDb(projectPath);
    }
    if (options.orm === 'drizzle') await setupDrizzleOrm(projectPath, options.database);

    await writeFile(join(projectPath, '.env'), envTemplate);

    const indexPath = join(projectPath, 'src', 'index.ts');
    const indexTemplatePath = join(__dirname, '../../templates/file/index-template.hbs');
    const indexTemplateSource = await readFile(indexTemplatePath, 'utf8');
    const indexTemplate = Handlebars.compile(indexTemplateSource);
    const indexContent = indexTemplate({});
    await writeFile(indexPath, indexContent);
}
