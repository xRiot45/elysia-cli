import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { folderMap } from '../constants/folders';
import { schematics } from '../constants/schematics';
import { capitalize } from '../utils/capitalize';

const schematicsMap = schematics as { [key: string]: string };

const capitalizeFileNameSchematics = ['interface', 'enum', 'type'];

Handlebars.registerHelper('routeName', function (value: string) {
    return value.replace(/Route$/, '');
});

function getTemplateContext(schematic: string, fileName: string) {
    const shouldCapitalize = capitalizeFileNameSchematics.includes(schematic);
    return {
        fileName: shouldCapitalize ? capitalize(fileName) : fileName,
    };
}

export async function generateFile(schematic: string, fileName: string) {
    // TODO: Validate schematic
    if (!schematicsMap[schematic]) {
        console.error(`❌ Invalid schematic "${schematic}"`);
        process.exit(1);
    }

    // TODO: Handle resources file
    if (schematic === 'resources') {
        const parts = ['controller', 'service', 'route', 'repository', 'validation', 'model', 'interface'];
        for (const part of parts) {
            await generateFile(part, fileName);
        }
        return;
    }

    // TODO: Determine target directory
    const folder = folderMap[schematic] ?? schematic;
    const targetDir = path.join(process.cwd(), 'src', folder);
    const filePath = path.join(targetDir, `${fileName}.${schematic}.ts`);

    // TODO: Prevent file overwriting
    if (fs.existsSync(filePath)) {
        console.error(`❌ File "${schematic} ${fileName}" already exists`);
        process.exit(1);
    }

    // TODO: Create folder if it doesn't exist
    fs.mkdirSync(targetDir, { recursive: true });

    // TODO: Check if template exists
    const templatePath = path.join(__dirname, `../templates/file/${schematic}-template.hbs`);
    if (!fs.existsSync(templatePath)) {
        console.error(`❌ Template not found: ${templatePath}`);
        process.exit(1);
    }

    // TODO: Generate file from template
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    const content = template(getTemplateContext(schematic, fileName));
    fs.writeFileSync(filePath, content, 'utf-8');

    // TODO: Generate index.ts automatically if schematic is route
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
}
