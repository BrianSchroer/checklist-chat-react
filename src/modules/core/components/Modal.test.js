import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import Modal from './Modal';
const formSelector =
  'div.checklist-chat-modal-backdrop > div.modal-dialog > div.modal-content > form';

function dummyFunction() {}

describe('Modal', () => {
  const modal = (
    <Modal
      title="test title"
      value="TestValue"
      children={[]}
      onSubmit={dummyFunction}
      onCloseRequest={dummyFunction}
    />
  );

  const enzymeHelper = new EnzymeHelper(modal);

  it('should render heading in title', () => {
    enzymeHelper.shallow();
    const h = enzymeHelper.findSingle(
      formSelector + ' > div.modal-header > h4'
    );
    expect(h.text()).toEqual(modal.props.title);
  });

  it('should render form id attribute when formId is specified', () => {
    enzymeHelper.shallow({ formId: 'testFormId' });
    const form = enzymeHelper.findSingle(formSelector);
    expect(form.props().id).toEqual('testFormId');
  });

  it('should not render form id attribute when formId is not specified', () => {
    enzymeHelper.shallow();
    const form = enzymeHelper.findSingle(formSelector);
    expect(form.props().id).toBe(undefined);
  });

  it('should render children in body', () => {
    const testChildren = ['child1', 'child2'];

    enzymeHelper.shallow({ children: testChildren });

    const body = enzymeHelper.findSingle(formSelector + ' > div.modal-body');

    const actualChildren = body.props().children;
    expect(actualChildren.length).toBe(2);
    expect(actualChildren[0]).toBe(testChildren[0]);
    expect(actualChildren[1]).toBe(testChildren[1]);
  });

  it('should render buttons in footer', () => {
    const buttons = 'test buttons';

    enzymeHelper.shallow({ buttons: buttons });

    const footer = enzymeHelper.findSingle(
      formSelector + ' > div.modal-footer'
    );

    expect(footer.text()).toEqual(buttons);
  });
});
