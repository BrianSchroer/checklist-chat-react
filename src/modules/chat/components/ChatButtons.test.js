import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import ChatButtons from './ChatButtons';

function dummyFunction() {}

describe('ChatButtons', () => {
  const chatButtons = (
    <ChatButtons
      onChatMessageAddRequest={dummyFunction}
      onChatParticipantsRequest={dummyFunction}
    />
  );

  const snapshotHelper = new SnapshotHelper(chatButtons);
  const enzymeHelper = new EnzymeHelper(chatButtons);

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  it('should handle chat message add request', () => {
    let wasCalled = false;

    enzymeHelper.shallow({
      onChatMessageAddRequest: () => {
        wasCalled = true;
      }
    });

    enzymeHelper.findSingle('div > button.btn-primary').simulate('click');

    expect(wasCalled).toBe(true);
  });

  it('should handle chat participants request', () => {
    let wasCalled = false;

    enzymeHelper.shallow({
      onChatParticipantsRequest: () => {
        wasCalled = true;
      }
    });

    enzymeHelper.findSingle('div > button.btn-default').simulate('click');

    expect(wasCalled).toBe(true);
  });
});
