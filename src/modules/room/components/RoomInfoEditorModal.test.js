import expect from 'expect';
import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import {RoomInfoEditorModal} from './RoomInfoEditorModal';

const defaultRoom = {
    id: 292,
    roomName: 'TestName',
    description: 'TestDescription',
    phoneInfo: 'TestPhone'
};

const defaultProps = {
    room: defaultRoom,
    userId: 'TestUserId',
    isNewRoom: false,
    shouldFocus: false,
    onCloseRequest: () => {},
    actions: {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<RoomInfoEditorModal {...props} />);
}

describe('RoomInfoEditorModal', () => {
    it('should render Modal with expected title when isNewRoom is true', () => {
        const modal = enzymeHelper.findSingle(
            render({isNewRoom: true, room: {id: '', roomName: '', description: '', phoneInfo: ''}}),
            'Modal');

        expect(modal.props().title).toBe('Add Chat Room');
    });

    it('should render Modal with expected title when isNewRoom is false', () => {
        const modal = enzymeHelper.findSingle(render({isNewRoom: false}), 'Modal');

        expect(modal.props().title).toBe('Edit Chat Room Info');
    });

    it('should render roomName TextInput', () => {
        const node =
            enzymeHelper.findSingle(render(), "Modal > div > TextInput[name='roomName']");
        const props = node.props();
        expect(props.label).toBe('Chat Room Name');
        expect(props.value).toBe(defaultRoom.roomName);
    });

    it('should render description TextInput', () => {
        const node =
            enzymeHelper.findSingle(render(), "Modal > div > TextInput[name='description']");
        const props = node.props();
        expect(props.label).toBe('Room Description');
        expect(props.value).toBe(defaultRoom.description);
    });

    it('should render phoneInfo TextInput', () => {
        const node =
            enzymeHelper.findSingle(render(), "Modal > div > TextInput[name='phoneInfo']");
        const props = node.props();
        expect(props.label).toBe('Phone Info');
        expect(props.value).toBe(defaultRoom.phoneInfo);
    });

});
