import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import {format} from '../../../util';
import ChecklistItemComment from './ChecklistItemComment';

const chatMessage = {
    timeStamp: '2016-12-08T14:57:10.222Z',
    userName: 'test userName',
    text: 'test text'
};

const props = { chatMessage };

function render(messageOverrides = {}) {
    props.chatMessage = Object.assign({}, chatMessage, messageOverrides);
    return shallow(<ChecklistItemComment {...props} />);
}

describe('ChecklistItemComment', () => {
    it('should render tr', () => {
        const tr = enzymeHelper.findSingle(render(), 'tr');
        expect(tr.hasClass('checklist-item-comment-row'));
    });

    it('should render expected number of columns', () => {
        const tds = enzymeHelper.find(render(), 'tr > td');
        expect(tds.length).toBe(4);
    });

    it('should render blank sequence number column', () => {
        const td = enzymeHelper.find(render(), 'tr > td').at(0);
        expect(td.text()).toEqual(' ');
    });

    it('should render blank status column', () => {
        const td = enzymeHelper.find(render(), 'tr > td').at(1);
        expect(td.text()).toEqual(' ');
    });

    it('should render timestamp column', () => {
        const td = enzymeHelper.find(render(), 'tr > td').at(2);
        expect(td.hasClass('timestamp'));
        expect(td.text()).toEqual(format.time(chatMessage.timeStamp));
    });

    it('should render userName / text column', () => {
        const td = enzymeHelper.find(render(), 'tr > td').at(3);
        expect(td.props().colSpan).toBe('4');

        const strong = enzymeHelper.findSingle(td, 'strong');
        expect(strong.text()).toEqual(`${chatMessage.userName}: `);

        const span = enzymeHelper.findSingle(td, 'span.chat-message-text');
        expect(span.text()).toEqual(chatMessage.text);
    });
});
