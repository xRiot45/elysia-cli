import fs from 'fs';
import Handlebars from 'handlebars';
import ora from 'ora';
import path from 'path';
import { folderMap } from '../constants/folders';
import { schematics } from '../constants/schematics';
import { capitalize } from '../utils/capitalize';
import { getProjectConfig } from '../utils/getProjectConfig';

const schematicsMap = schematics as { [key: string]: string };
const capitalizeFileNameSchematics = ['interface', 'enum', 'type'];

Handlebars.registerHelper('routeName', function (value: string) {
    return value.replace(/Route$/, '');
});

function getTemplateContext(schematic: string, fileName: string) {
    const shouldCapitalize = capitalizeFileNameSchematics.includes(schematic);
    const config = getProjectConfig();
    return {
        fileName: shouldCapitalize ? capitalize(fileName) : fileName,
        useSwagger: config.useSwagger ?? false,
    };
}

async function generateResources(fileName: string) {
    const spinner = ora(`Generating full resource for "${fileName}"...`).start();
    const parts = ['controller', 'service', 'route', 'repository', 'validation', 'model', 'interface'];

    try {
        for (const part of parts) {
            await generateFile(part, fileName);
        }

        spinner.succeed(`All resources for "${fileName}" generated successfully!`);
    } catch (err) {
        spinner.fail(`Failed to generate all resources for "${fileName}"`);
        console.error(err);
    }
}

export async function generateFile(schematic: string, fileName: string) {
    if (schematic === 'resources') {
        await generateResources(fileName);
        return;
    }

    const spinner = ora(`Generating ${schematic} "${fileName}"...`).start();

    try {
        if (!schematicsMap[schematic]) {
            spinner.fail(`Invalid schematic "${schematic}"`);
        }

        const folder = folderMap[schematic] ?? schematic;
        const targetDir = path.join(process.cwd(), 'src', folder);
        const filePath = path.join(targetDir, `${fileName}.${schematic}.ts`);

        if (fs.existsSync(filePath)) {
            spinner.fail(`File "${schematic} ${fileName}" already exists`);
        }

        fs.mkdirSync(targetDir, { recursive: true });

        const templatePath = path.join(__dirname, `../templates/file/${schematic}-template.hbs`);
        if (!fs.existsSync(templatePath)) {
            spinner.fail(`Template not found: ${templatePath}`);
        }

        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = Handlebars.compile(templateSource);
        const content = template(getTemplateContext(schematic, fileName));
        fs.writeFileSync(filePath, content, 'utf-8');

        if (schematic === 'route') {
            const routesDir = path.join(process.cwd(), 'src/routes');
            const indexFilePath = path.join(routesDir, 'index.ts');
            const indexTemplatePath = path.join(__dirname, '../templates/file/routes-index-template.hbs');

            const routeFiles = fs.readdirSync(routesDir).filter((f) => f.endsWith('.route.ts'));
            const routeNames = routeFiles.map((file) => {
                const base = path.basename(file, '.route.ts');
                return `${base}Route`;
            });

            const indexTemplateSource = fs.readFileSync(indexTemplatePath, 'utf8');
            const indexTemplate = Handlebars.compile(indexTemplateSource);
            const indexContent = indexTemplate({ routes: routeNames });

            fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
        }

        spinner.succeed(`"${schematic}" for "${fileName}" generated successfully!`);
    } catch (err) {
        spinner.fail(`Failed to generate ${schematic} "${fileName}"`);
        console.error(err);
    }
}
