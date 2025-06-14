import fs from 'fs';
import path from 'path';
import { schematics } from '../constants/schematics';

const schematicsMap = schematics as { [key: string]: string };

export async function generateFile(schematic: string, fileName: string) {
    if (!schematicsMap[schematic]) {
        console.error(`❌ Invalid schematic "${schematic}"`);
        process.exit(1);
    }

    const folderMap: Record<string, string> = {
        controller: 'controllers',
        service: 'services',
        route: 'routes',
        repository: 'repositories',
        validation: 'validations',
        model: 'databases/models',
        interface: 'interfaces',
        types: 'types',
        resources: 'resources',
        config: 'configs',
        middleware: 'middlewares',
        util: 'utils',
        enum: 'enums',
    };

    if (schematic === 'resources') {
        const parts = ['controller', 'service', 'route', 'repository', 'validation', 'model', 'interface'];
        for (const part of parts) {
            await generateFile(part, fileName);
        }
        return;
    }

    const folder = folderMap[schematic] ?? schematic;
    const targetDir = path.join(process.cwd(), folder);
    const fileExtension = schematic === 'types' ? '.d.ts' : '.ts';
    const filePath = path.join(targetDir, `${fileName}.${schematic}.${fileExtension}`);

    // TODO: Prevent file overwriting
    if (fs.existsSync(filePath)) {
        console.error(`❌ File "${filePath}" already exists`);
        process.exit(1);
    }

    // TODO: Create folder if it doesn't exist
    fs.mkdirSync(targetDir, { recursive: true });
}
