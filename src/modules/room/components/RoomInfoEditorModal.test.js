import React from 'react';
import { snapshotHelper } from '../../../util/testHelpers';
import initialState from '../../../app/store/initialState';
import { RoomInfoEditorModal, mapStateToProps } from './RoomInfoEditorModal';

const defaultRoom = {
  id: 292,
  roomName: 'TestName',
  description: 'TestDescription',
  phoneInfo: 'TestPhone'
};

const emptyRoom = {
  id: '',
  roomName: '',
  description: '',
  phoneInfo: ''
};

const defaultProps = {
  room: defaultRoom,
  isNewRoom: false,
  shouldFocus: false,
  onCloseRequest: () => {},
  actions: {
    saveRoomInfo: () => {}
  }
};

const defaultOwnProps = {
  onCloseRequest: () => {}
};

function overrideProps(propOverrides) {
  return Object.assign({}, defaultProps, propOverrides);
}

function assertSnapshotMatch(propOverrides = {}) {
  snapshotHelper.assertMatch(
    <RoomInfoEditorModal {...overrideProps(propOverrides)} />
  );
}

function newRoomInfoEditorModal() {
  const props = { room: defaultRoom };
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

  it('constructor should set expected component state', () => {
    const state = newRoomInfoEditorModal().state;
    expect(state.room.id).toBe(defaultRoom.id);
    expect(state.isSaving).toBe(false, 'isSaving should be false');
    expect(state.isDeleting).toBe(false, 'isDeleting should be false');
    expect(state.isDirty).toBe(false, 'isDirty should be false');
    expect(Object.keys(state.errors).length).toBe(
      0,
      'errors should be empty object'
    );
  });

  it('should render correctly for new room', () => {
    assertSnapshotMatch({ isNewRoom: true, room: emptyRoom });
  });

  it('should render correctly for existing room', () => {
    assertSnapshotMatch();
  });
});
