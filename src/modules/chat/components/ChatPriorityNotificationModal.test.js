import React from 'react';
import initialState from '../../../app/store/initialState';
import { SnapshotHelper } from '../../../util/testHelpers';
import { ChatPriorityNotificationModal, mapStateToProps } from './ChatPriorityNotificationModal';
import { chatMessageType } from '../../chat';

const defaultOwnProps = {
  onCloseRequest: () => { }
};

function dummyFunction() { }

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
  const state = Object.assign({}, initialState, stateOverrides || {});
  const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

  return mapStateToProps(state, ownProps);
}

describe('ChatPriorityNotificationModal', () => {
  const snapshotHelper = new SnapshotHelper(
    <ChatPriorityNotificationModal
      chatMessage={{
        timeStamp: '2016-12-08T14:57:10.222Z',
        userName: 'test userName',
        text: 'test text',
        chatMessageType: chatMessageType.CHAT
      }}
      onCloseRequest={dummyFunction}
    />
  );

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  describe('mapStateToProps', () => {
    it('should return expected props', () => {
      const testMessage = { id: 123 };
      const stateOverrides = { modalDialogRequest: { keys: [testMessage] } };
      const props = callMapStateToProps(stateOverrides);

      expect(props.chatMessage).toBe(testMessage);
      expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
    });
  });
});
