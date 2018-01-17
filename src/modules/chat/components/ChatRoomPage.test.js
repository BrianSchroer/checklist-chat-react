import React from 'react';
import initialState from '../../../app/store/initialState';
import { SnapshotHelper } from '../../../util/testHelpers';
import { ChatRoomPage, mapStateToProps } from './ChatRoomPage';

function dummyFunction() { }

function callMapStateToProps(stateOverrides) {
  const state = Object.assign({}, initialState, stateOverrides || {});
  return mapStateToProps(state);
}

describe('ChatRoomPage', () => {
  const snapshotHelper = new SnapshotHelper(
    <ChatRoomPage
      match={{ params: { id: 123 } }}
      userId="TestUserId"
      room={{ id: 123 }}
      checklistItems={[]}
      chatMessages={[]}
      actions={{ joinChat: dummyFunction }}
    />);

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  describe('mapStateToProps', () => {
    it('should return expected props', () => {
      const stateOverrides =
        {
          roomId: 666,
          rooms: [{ id: 666 }]
        };
      const props = callMapStateToProps(stateOverrides);

      expect(props.userId).toBe(initialState.userId);
      expect(props.room.id).toBe(stateOverrides.roomId);
      expect(props.checklistItems).toBe(initialState.checklistItems);
      expect(props.chatMessages).toBe(initialState.chatMessages);
    });
  });
});
