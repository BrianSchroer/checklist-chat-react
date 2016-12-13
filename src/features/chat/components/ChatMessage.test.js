import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import enzymeHelper from '../../../util/enzymeHelper';
import ChatMessage from './ChatMessage';

function renderWith(props) {
    return shallow(<ChatMessage {...props}/>);
}

describe('ChatMessage', () => {
    const message = {
        timeStamp: '2016-12-08T14:57:10.222Z',
        userName: 'test userName',
        text: 'test text'
    };
    const props = { message: message };

    it('should render message.timeStamp', () =>{
        const elem = enzymeHelper.findSingle(renderWith(props),
            'li > div.chat-message-timestamp > TimeStamp');
        expect(elem.props().timeStamp).toBe(props.message.timeStamp);
    });

    it('should render message.userName', () => {
        const elem = enzymeHelper.findSingle(renderWith(props), 'li > strong');
        expect(elem.text()).toBe(props.message.userName+ ': ');
    });

    it('should render message.text', () => {
        const elem = enzymeHelper.findSingle(renderWith(props),
            'li > span.chat-message-text');
        expect(elem.text()).toBe(props.message.text);
    });
});
