import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Markdown = ({source, className}) => {
    return (
        <ReactMarkdown
            className={className}
            source={source}
            softBreak="br"
            disallowedTypes={['Heading', 'ThematicBreak']}
            escapeHtml
            unwrapDisallowed
        />);
};

Markdown.propTypes = {
    source: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Markdown;
