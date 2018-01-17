import React from 'react';
import { shallow, enzymeHelper, SnapshotHelper } from '../../../util/testHelpers';
import ChatButtons from './ChatButtons';

const defaultProps = {
  onChatMessageAddRequest: () => { },
  onChatParticipantsRequest: () => { }
};

function overrideProps(propOverrides) {
  return Object.assign({}, defaultProps, propOverrides);
}

function shallowRender(propOverrides) {
  return shallow(<ChatButtons {...overrideProps(propOverrides) } />);
}

function dummyFunction() { }

describe('ChatButtons', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(
      <ChatButtons
        onChatMessageAddRequest={dummyFunction}
        onChatParticipantsRequest={dummyFunction}
      />);
  });

  it('should handle chat message add request', () => {
    let wasCalled = false;

    const button = enzymeHelper.findSingle(
      shallowRender({ onChatMessageAddRequest: () => { wasCalled = true; } }),
      'div > button.btn-primary');

    button.simulate('click');

    expect(wasCalled).toBe(true);
  });

  it('should handle chat participants request', () => {
    let wasCalled = false;

    const button = enzymeHelper.findSingle(
      shallowRender({ onChatParticipantsRequest: () => { wasCalled = true; } }),
      'div > button.btn-default');

    button.simulate('click');

    expect(wasCalled).toBe(true);
  });
});
