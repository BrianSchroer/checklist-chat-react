import React from 'react';
import { SnapshotHelper } from '../../../util/testHelpers';
import initialState from '../../../app/store/initialState';
import { RoomInfoEditorModal, mapStateToProps } from './RoomInfoEditorModal';

const defaultOwnProps = {
    onCloseRequest: () => { }
};

function dummyFunction() { }

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('RoomInfoEditorModal', () => {
    const roomInfoEditorModal = (
        <RoomInfoEditorModal
            room={{
                id: 292,
                roomName: 'TestName',
                description: 'TestDescription',
                phoneInfo: 'TestPhone'
            }}
            isNewRoom={false}
            shouldFocus={false}
            onCloseRequest={dummyFunction}
            actions={{ saveRoomInfo: dummyFunction }}
        />
    );

    const snapshotHelper = new SnapshotHelper(roomInfoEditorModal);

    it('should render correctly for existing room', () => {
        snapshotHelper.test();
    });

    it('should render correctly for new room', () => {
        snapshotHelper.test({
            isNewRoom: true,
            room: {
                id: '',
                roomName: '',
                description: '',
                phoneInfo: ''
            }
        });
    });

    it('constructor should set expected component state', () => {
        const { props } = roomInfoEditorModal;
        const { state } = new RoomInfoEditorModal(props);
        expect(state.room.id).toBe(props.room.id);
        expect(state.isSaving).toBe(false, 'isSaving should be false');
        expect(state.isDeleting).toBe(false, 'isDeleting should be false');
        expect(state.isDirty).toBe(false, 'isDirty should be false');
        expect(Object.keys(state.errors).length).toBe(
            0,
            'errors should be empty object'
        );
    });

    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const props = callMapStateToProps();
            expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
        });

        it('should set expected room properties when modalDialogRequest.key exists', () => {
            const testRoom = { id: 123 };

            const stateOverrides = {
                rooms: [{ id: 1 }, { id: testRoom.id }, { id: 999 }],
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
});
