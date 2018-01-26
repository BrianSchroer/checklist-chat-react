import React from 'react';
import { storiesOf, linkTo, infoDecorator } from '../../../../tools/storybook';
import Markdown from './Markdown';

const sample = (...sourceStrings) => {
  return sampleWithClassName(sourceStrings.join(''));
};

const sampleWithClassName = (source, className) => {
  return (
    <div style={{ margin: '1em' }}>
      <p>
        Customized markdown component that wraps the"react-markdown" npm
        package's "ReactMarkdown" component.
      </p>
      <hr />
      <h4>source:</h4>
      <pre>{source}</pre>
      <h4>className:</h4>
      <div>{className || '(none)'}</div>
      <h4>output:</h4>
      <Markdown source={source} className={className} />
    </div>
  );
};

storiesOf('Markdown', module)
  .addDecorator(infoDecorator)
  .add('source without markdown', () =>
    sample(
      'Source without any markdown formatting renders as a "p" within a "div".'
    )
  )
  .add('Headings (not allowed)', () => sample('# H1', '\n## H2', '\n### H3'))
  .add('source with className', () =>
    sampleWithClassName('This should be italic.', 'chat-action-message-text')
  )
  .add('emphasis (italic)', () =>
    sample(
      'Text within *asterisks* or _underscores_ is rendered within "em" tags.'
    )
  )
  .add('strong (bold)', () =>
    sample(
      'Text within **double asterisks** or **double underscores**',
      ' is rendered within "strong" tags.'
    )
  )
  .add('links', () =>
    sample(
      'Here are links to the "react-markdown" github repo:',
      '\n[https://github.com/rexxars/react-markdown](https://github.com/rexxars/react-markdown),',
      '\nand to  a [markdown reference page](http://commonmark.org/help/)',
      '\n"Raw" links like http://www.google.com should rendered as links,',
      '\n"but not without the "http" prefix (e.g. www.google.com).'
    )
  )
  .add('image', () =>
    sample(
      "Here's an image: ",
      '![Image](https://media.giphy.com/media/OxgjxSpRwMXoA/giphy.gif)'
    )
  )
  .add('line feeds', () =>
    sample('Line1 \nLine2 \nLine3 \n(\\n is converted to <br>)')
  )
  .add('unordered list', () =>
    sample(
      'can be specified with asterisks:',
      '\n* item 1',
      '\n* item 2',
      '\n\n...or with dashes:',
      '\n- item 1',
      '\n- item 2'
    )
  )
  .add('ordered list', () =>
    sample(
      'can be specified like this:',
      '\n1. item 1',
      '\n2. item 2',
      '\n\n...or like this:',
      '\n1) item 1',
      '\n2) item 2',
      "\n\n(but it's not working with react-markdown version 3)"
    )
  )
  .add('horizontal rule (not allowed)', () =>
    sample(
      'Horizontal rule cannot be specified with three underscores:',
      '\n___',
      '\nor with three asterisks',
      '\n***'
    )
  )
  .add('inline code', () =>
    sample('An arrow function looks like this: `number => number + 1`.')
  )
  .add('code block', () =>
    sample(
      "Here's some sample JavaScript:",
      '\n```',
      '\nfunction addOne(number) {',
      '\n    return number + 1;',
      '\n}',
      '\n```',
      '\nThat was a code block.'
    )
  )
  .add('block quote', () =>
    sample(
      "Hofstadter's law states:",
      "\n> It always takes longer than you expect, even when you take into account Hofstadter's Law",
      "\n\nThat was Hofstadter's law."
    )
  )
  .add('escaped inline HTML', () =>
    sample('Inline HTML gets "escaped", like this: <span>inline HTML</span>')
  );
