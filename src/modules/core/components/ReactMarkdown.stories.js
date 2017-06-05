import React from 'react';
import {storiesOf} from '@storybook/react';
import ReactMarkdown from 'react-markdown';

const sample = (...sourceStrings) => {
    const source = sourceStrings.join('');
    return (
        <div style={{margin: "1em"}}>
            <p style={{fontStyle: "italic"}}>
                (ReactMarkdown is imported from the 'react-markdown' npm package,
                not a custom component written for this project.)
            </p>
            <hr />
            <h4>source:</h4>
            <pre>{source}</pre>
            <h4>output:</h4>
            <ReactMarkdown {...Object.assign({escapeHtml: true, softBreak: 'br'}, {source})} />
        </div>
    );
};

storiesOf('ReactMarkdown', module)

    .add('source without markdown', () =>
        sample('Source without any markdown formatting renders as a "p" within a "div".'))

    .add('emphasis (italic)', () =>
        sample('Text within *asterisks* or _underscores_ is rendered within "em" tags.'))

    .add('strong (bold)', () =>
        sample('Text within **double asterisks** or **double underscores**',
            ' is rendered within "strong" tags.'))

    .add('links', () =>
        sample('Here are links to the "react-markdown" github repo:',
            '\n[https://github.com/rexxars/react-markdown](https://github.com/rexxars/react-markdown),',
            '\nand to  a [markdown reference page](http://commonmark.org/help/)'))

    .add('image', () =>
        sample("Here's an image: ",
            '![Image](https://media.giphy.com/media/OxgjxSpRwMXoA/giphy.gif)'))

    .add('line feeds', () =>
        sample('Line1 \nLine2 \nLine3 \n(\\n is converted to <br>)'))

    .add('unordered list', () =>
        sample('can be specified with asterisks:',
            '\n* item 1',
            '\n* item 2',
            '\n\n...or with dashes:',
            '\n- item 1',
            '\n- item 2'
        ))

    .add('ordered list', () =>
        sample('can be specified like this:',
            '\n1. item 1',
            '\n2. item 2',
            '\n\n...or like this:',
            '\n1) item 1',
            '\n2) item 2'
        ))

    .add('horizontal rule', () =>
        sample('can be specified with three underscores:',
            '\n___',
            '\nor with three asterisks',
            '\n***'
        ))

    .add('escaped inline HTML', () =>
        sample('Inline HTML gets "escaped", like this: <span>inline HTML</span>'))
;
