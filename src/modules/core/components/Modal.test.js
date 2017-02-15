import React from 'react';
import {expect, shallow, enzymeHelper} from '../../../util/testHelpers';
import Modal from './Modal';

const defaultProps = {
    title: 'test title',
    value: 'TestValue',
    children: [],
    onSubmit: () => {},
    onCloseRequest: () => {}
};

const formSelector =
    'div.checklist-chat-modal-backdrop > div.modal-dialog > div.modal-content > form';

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<Modal {...props}/>);
}

describe('Modal', () => {
    it('should render heading in title', () => {
        const h = enzymeHelper.findSingle(render(),
            formSelector + ' > div.modal-header > h4');

        expect(h.text()).toEqual(defaultProps.title);
    });

    it('should render form id attribute when formId is specified', () => {
        const form = enzymeHelper.findSingle(
            render({formId: 'testFormId'}),
            formSelector);

        expect(form.props().id).toEqual('testFormId');
    });

    it('should not render form id attribute when formId is not specified', () => {
        const form = enzymeHelper.findSingle(render(), formSelector);

        expect(form.props().id).toBe(undefined);
    });

    it('should render children in body', () => {
        const testChildren = ['child1', 'child2'];

        const body = enzymeHelper.findSingle(render({children: testChildren}),
            formSelector + ' > div.modal-body');

        const actualChildren = body.props().children;
        expect(actualChildren.length).toBe(2);
        expect(actualChildren[0]).toBe(testChildren[0]);
        expect(actualChildren[1]).toBe(testChildren[1]);
    });

    it('should render buttons in footer', () => {
        const buttons = 'test buttons';

        const footer = enzymeHelper.findSingle(render({buttons: buttons}),
            formSelector + ' > div.modal-footer');

        expect(footer.text()).toEqual(buttons);
    });
});
