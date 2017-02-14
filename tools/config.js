import fs from 'fs';
import path from 'path';

export default class {
    static getValue(key) {
        const packageJsonPath = path.join(__dirname, '../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const config = packageJson.config;

        if (!config.hasOwnProperty(key)) {
            throw(`"${key}" not found in package.json config values: ${JSON.stringify(config)}`);
        }

        return config[key];
    }

    static getPort() {
        return this.getValue('port');
    }

    static getMockApiPort() {
        return this.getValue('mock_api_port');
    }

    static getStorybookPort() {
        return this.getValue('storybook_port');
    }
}
