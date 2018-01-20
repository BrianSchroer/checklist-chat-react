import React from 'react';
import initialState from '../../../app/store/initialState';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import {
  ChatParticipantsModal,
  mapStateToProps
} from './ChatParticipantsModal';

const defaultOwnProps = {
  onCloseRequest: () => {}
};

function dummyFunction() {}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
  const state = Object.assign({}, initialState, stateOverrides || {});
  const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

  return mapStateToProps(state, ownProps);
}

describe('ChatParticipantsModal', () => {
  const snapshotHelper = new SnapshotHelper(
    (
      <ChatParticipantsModal
        chatParticipants={[1, 2, 3, 4, 5].map(i => ({
          name: `name ${i}`,
          department: `department ${i}`,
          title: `title ${i}`,
          connection: `connection ${i}`
        }))}
        onCloseRequest={dummyFunction}
        actions={{}}
      />
    )
  );

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  describe('mapStateToProps', () => {
    it('should return expected props', () => {
      const stateOverrides = { roomId: 666 };
      const props = callMapStateToProps(stateOverrides);

      expect(props.chatParticipants).toBe(initialState.chatParticipants);
      expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
    });
  });
});
