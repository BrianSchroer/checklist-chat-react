import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import initialState from '../../../app/store/initialState';
import {RoomInfoEditorModal, mapStateToProps} from './RoomInfoEditorModal';

const defaultRoom = {
    id: 292,
    roomName: 'TestName',
    description: 'TestDescription',
    phoneInfo: 'TestPhone'
};

const defaultProps = {
    room: defaultRoom,
    isNewRoom: false,
    shouldFocus: false,
    onCloseRequest: () => {},
    actions: {}
};

const defaultOwnProps = {
    onCloseRequest: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<RoomInfoEditorModal {...props}/>);
}

function newRoomInfoEditorModal() {
    const props = {room: defaultRoom};
    return new RoomInfoEditorModal(props);
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('RoomInfoEditorModal', () => {
    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const props = callMapStateToProps();
            expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
            expect(props.shouldFocus).toBe(true);
        });

        it('should set expected room properties when modalDialogRequest.key exists', () => {
            const testRoom = { id: 123 };

            const stateOverrides = {
                rooms: [ { id: 1}, { id: testRoom.id }, { id: 999} ],
                modalDialogRequest: { keys: [testRoom.id] }
            };

            const props = callMapStateToProps(stateOverrides);

            expect(props.isNewRoom).toBe(false);
            expect(props.room).toBe(stateOverrides.rooms[1]);
        });

        it('should set expected room properties when modalDialogRequest.key does not exist', () => {
            const stateOverrides = {
                rooms: [],
                modalDialogRequest: { keys: [] }
            };

            const props = callMapStateToProps(stateOverrides);

            expect(props.isNewRoom).toBe(true);
            expect(props.room.id).toBe('');
        });
    });

    it('constructor should set expected component state', () => {
        const state = newRoomInfoEditorModal().state;
        expect(state.room.id).toBe(defaultRoom.id);
        expect(state.isSaving).toBe(false, 'isSaving should be false');
        expect(state.isDeleting).toBe(false, 'isDeleting should be false');
        expect(state.isDirty).toBe(false, 'isDirty should be false');
        expect(Object.keys(state.errors).length).toBe(0, 'errors should be empty object');
    });

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
