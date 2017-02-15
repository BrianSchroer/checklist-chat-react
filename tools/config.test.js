import assert from 'assert';
import config from './config';

describe('config', () => {
    it('getValue should return value for valid key', () => {
        const actual = config.getValue('port');
        expect(actual).toBeDefined();
    });

    it('getValue should throw error for invalid key', () => {
        try {
            config.getValue('bad key');
        } catch (error) {
            expect(error).toContain('"bad key" not found in package.json config values: {');
            return;
        }

        assert.fail(null, null, 'Expected error was not thrown.');
    });

    it('getPort should return port from package.json config', () => {
        const actual = config.getPort();
        expect(actual).toBeDefined();
    });

    it('getMockApiPort should return port from package.json config', () => {
        const actual = config.getMockApiPort();
        expect(actual).toBeDefined();
    });

    it('getStorybookPort should return port from package.json config', () => {
        const actual = config.getStorybookPort();
        expect(actual).toBeDefined();
    });
});
