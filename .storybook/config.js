import {configure} from '@kadira/storybook';

function loadStories() {
    const req = require.context('../src/components', true, /.stories.js$/);
    req.keys().sort().forEach((fileName) => req(fileName));
}

configure(loadStories, module);
