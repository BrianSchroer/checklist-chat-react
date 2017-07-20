import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import Markdown from './Markdown';

function assertSnapshotMatch(...sourceStrings) {
    assertSnapshotMatchWithClassName(sourceStrings.join(''));
}

function assertSnapshotMatchWithClassName(source, className) {
    snapshotHelper.assertMatch(
        <div>
            <h4>source:</h4>
            <pre>{source}</pre>
            <h4>className:</h4>
            <div>{className || '(none)'}</div>
            <h4>output:</h4>
            <Markdown source={source} className={className} />
        </div>);
}

describe('Markdown', () => {

    it('should render source without markdown', () =>
        assertSnapshotMatch('Source without any markdown formatting renders as a "p" within a "div".'));


    it('should not allow headings', () =>
        assertSnapshotMatch('# H1',
            '\n## H2',
            '\n### H3'));

    it('should render source with className', () =>
        assertSnapshotMatchWithClassName('This should be italic.', 'chat-action-message-text'));

    it('should render emphasis (italic)', () =>
        assertSnapshotMatch('Text within *asterisks* or _underscores_ is rendered within "em" tags.'));

    it('should render strong (bold)', () =>
        assertSnapshotMatch('Text within **double asterisks** or **double underscores**',
            ' is rendered within "strong" tags.'));

    it('should render links', () =>
        assertSnapshotMatch('Here are links to the "react-markdown" github repo:',
            '\n[https://github.com/rexxars/react-markdown](https://github.com/rexxars/react-markdown),',
            '\nand to  a [markdown reference page](http://commonmark.org/help/)'));

    it('should render images', () =>
        assertSnapshotMatch("Here's an image: ",
            '![Image](https://media.giphy.com/media/OxgjxSpRwMXoA/giphy.gif)'));

    it('should render line feeds', () =>
        assertSnapshotMatch('Line1 \nLine2 \nLine3 \n(\\n is converted to <br>)'));

    it('should render unordered lists', () =>
        assertSnapshotMatch('can be specified with asterisks:',
            '\n* item 1',
            '\n* item 2',
            '\n\n...or with dashes:',
            '\n- item 1',
            '\n- item 2'
        ));

    it('should render ordered lists', () =>
        assertSnapshotMatch('can be specified like this:',
            '\n1. item 1',
            '\n2. item 2',
            '\n\n...or like this:',
            '\n1) item 1',
            '\n2) item 2'
        ));

    it('should not render horizontal rules', () =>
        assertSnapshotMatch('Horizontal rule cannot be specified with three underscores:',
            '\n___',
            '\nor with three asterisks',
            '\n***'
        ));

    it('should render inline code', () =>
        assertSnapshotMatch('An arrow function looks like this: `number => number + 1`.'));

    it('should render code blocks', () =>
        assertSnapshotMatch('Here\'s some assertSnapshotMatch JavaScript:',
        '\n```',
        '\nfunction addOne(number) {',
        '\n    return number + 1;',
        '\n}',
        '\n```',
        '\nThat was a code block.'));

    it('should render block quotes', () =>
        assertSnapshotMatch('Hofstadter\'s law states:',
        '\n> It always takes longer than you expect, even when you take into account Hofstadter\'s Law',
        '\n\nThat was Hofstadter\'s law.'));

    it('should escape inline HTML', () =>
        assertSnapshotMatch('Inline HTML gets "escaped", like this: <span>inline HTML</span>'));
});
