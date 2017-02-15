import * as REGEX from './regexConstants';

describe('regexConstants', () => {
    [
        { pattern: REGEX.CSS_PATH, path: 'src/styles/style.css', expected: true },
        { pattern: REGEX.CSS_PATH, path: 'src/modules/home/HomePage.js', expected: false },
        { pattern: REGEX.EOT_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.eot', expected: true },
        { pattern: REGEX.EOT_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.eot?v=1.2.3', expected: true },
        { pattern: REGEX.JS_PATH, path: 'src/styles/style.css', expected: false },
        { pattern: REGEX.JS_PATH, path: 'src/modules/home/HomePage.js', expected: true },
        { pattern: REGEX.SVG_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.svg', expected: true },
        { pattern: REGEX.SVG_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.svg?v=1.2.3', expected: true },
        { pattern: REGEX.TTF_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.ttf', expected: true },
        { pattern: REGEX.TTF_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.ttf?v=1.2.3', expected: true },
        { pattern: REGEX.WOFF_OR_WOFF2_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.woff', expected: true },
        { pattern: REGEX.WOFF_OR_WOFF2_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.woff?v=1.2.3', expected: true },
        { pattern: REGEX.WOFF_OR_WOFF2_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.woff2', expected: true },
        { pattern: REGEX.WOFF_OR_WOFF2_PATH, path: 'node_modules/bootstrap/fonts/gylphicons-halflings-regular.woff2?v=1.2.3', expected: true },
        { pattern: REGEX.IMAGES_PATH, path: 'src/images/Logo.png', expected: true }
    ]
    .forEach(scenario => {
        const pathToTest = scenario.path;
        it(`should return expected result for ${scenario.pattern}\n\tand "${pathToTest}"`, () => {
            expect(scenario.pattern.test(pathToTest)).toEqual(scenario.expected);
        });
    });
});
