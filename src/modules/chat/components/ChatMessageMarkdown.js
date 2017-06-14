import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ChatMessageMarkdown = ({source, className}) => {
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

ChatMessageMarkdown.propTypes = {
    source: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default ChatMessageMarkdown;
