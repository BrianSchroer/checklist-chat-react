import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import ReactMarkdown from 'react-markdown';

const defaultProps = {
    source: 'test source'
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    const wrapper = shallow(<ReactMarkdown {...props} />);
    return wrapper;
}

describe('ReactMarkdown', () => {
    it('by default should render div and p', () => {
        const p = enzymeHelper.findSingle(render(), 'div > p');
        expect(p.text()).toEqual(defaultProps.source);
    });
});
