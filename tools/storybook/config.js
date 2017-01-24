import { configure } from '@kadira/storybook';

function extractFileName(path) {
    const separator = '/';
    const nodes = path.split(separator);
    let fileName = nodes[nodes.length - 1];

    if (fileName.startsWith('_')) {
        fileName = ' ' + fileName.substring(1);
    }

    return fileName;
}

function pathComparer(path1, path2) {
    const fileName1 = extractFileName(path1);
    const fileName2 = extractFileName(path2);
    let response = 0;

    if (fileName1 < fileName2) {
        response = -1;
    } else {
        if (fileName1 > fileName2) {
            response = 1;
        }
    }

    return response;
}

function loadStories() {
    const req = require.context(
        '../../src/',
        /* includeSubdirectories: */ true,
        /.stories.js$/);

    const sortedKeys = req.keys().sort(pathComparer);
    sortedKeys.forEach((fileName) => req(fileName));
}

configure(loadStories, module);
