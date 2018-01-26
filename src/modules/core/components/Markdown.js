import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

const Markdown = ({ source, className }) => {
  return (
    <ReactMarkdown
      plugins={[breaks]}
      className={className}
      source={source}
      disallowedTypes={['heading', 'thematicBreak']}
      escapeHtml
      unwrapDisallowed={false}
    />
  );
};

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Markdown;
