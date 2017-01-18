import {configure} from '@kadira/storybook';

function fileNameWithoutPath(fileName) {
    const separator = '/';
    const nodes = fileName.split(separator);
    return nodes[nodes.length - 1];
}

function loadStories() {
    const req = require.context(
        '../../src/',
        /* includeSubdirectories: */ true,
        /.stories.js$/);

    req.keys().sort(fileNameWithoutPath).forEach((fileName) => req(fileName));
}

configure(loadStories, module);
