import React from 'react';
import {snapshotHelper, shallow, enzymeHelper} from '../../../util/testHelpers';
import ChatButtons from './ChatButtons';

const defaultProps = {
    onChatMessageAddRequest: () => {},
    onChatParticipantsRequest: () => {}
};

function shallowRender(propOverrides) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<ChatButtons {...props} />);
}

describe('ChatButtons', () => {
    it('should render correctly', () => {
        snapshotHelper.assertMatch(<ChatButtons {...defaultProps}/>);
    });

    it('should handle chat message add request', () => {
        let wasCalled = false;

        const button = enzymeHelper.findSingle(
            shallowRender({ onChatMessageAddRequest: () => {wasCalled = true;} }),
            'div > button.btn-primary');

        button.simulate('click');

        expect(wasCalled).toBe(true);
    });

    it('should handle chat participants request', () => {
        let wasCalled = false;

        const button = enzymeHelper.findSingle(
            shallowRender({ onChatParticipantsRequest: () => {wasCalled = true;} }),
            'div > button.btn-default');

        button.simulate('click');

        expect(wasCalled).toBe(true);
    });
});
