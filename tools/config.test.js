import assert from 'assert';
import {expect} from '../src/util/testHelpers';
import config from './config';

describe('config', () => {
    it('getValue should return value for valid key', () => {
        const actual = config.getValue('port');
        expect(actual).toExist();
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
        expect(actual).toExist();
    });

    it('getMockApiPort should return port from package.json config', () => {
        const actual = config.getMockApiPort();
        expect(actual).toExist();
    });

    it('getStorybookPort should return port from package.json config', () => {
        const actual = config.getStorybookPort();
        expect(actual).toExist();
    });
});
