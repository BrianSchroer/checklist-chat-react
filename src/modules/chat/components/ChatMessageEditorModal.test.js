import React from 'react';
import initialState from '../../../app/store/initialState';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import {
  ChatMessageEditorModal,
  mapStateToProps
} from './ChatMessageEditorModal';

const defaultOwnProps = {
  onCloseRequest: () => {}
};

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
  const state = Object.assign({}, initialState, stateOverrides || {});
  const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

  return mapStateToProps(state, ownProps);
}

function dummyFunction() {}

describe('ChatMessageEditorModal', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(
      <ChatMessageEditorModal
        roomId="123"
        onCloseRequest={dummyFunction}
        actions={{}}
      />
    );
  });

  describe('mapStateToProps', () => {
    it('should return expected props', () => {
      const stateOverrides = { roomId: 666 };
      const props = callMapStateToProps(stateOverrides);

      expect(props.roomId).toBe(stateOverrides.roomId);
      expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
    });
  });
});
