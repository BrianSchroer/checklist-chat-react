import React from 'react';
import {snapshotHelper, shallow, enzymeHelper} from '../../../util/testHelpers';
import ChecklistButtons from './ChecklistButtons';

const defaultProps = {
    onChecklistItemAddRequest: () => {}
};

function overrideProps(propOverrides) {
    return Object.assign({}, defaultProps, propOverrides);
}

function shallowRender(propOverrides) {
    return shallow(<ChecklistButtons {...overrideProps(propOverrides)} />);
}

function assertSnapshotMatch(propOverrides = {}) {
    snapshotHelper.assertMatch(<ChecklistButtons {...overrideProps(propOverrides)} />);
}

describe('ChecklistButtons', () => {
    it('should render correctly', () => {
        assertSnapshotMatch();
    });

    it('should handle checklist item add request', () => {
        let wasCalled = false;

        const button = enzymeHelper.findSingle(
            shallowRender({ onChecklistItemAddRequest: () => {wasCalled = true;} }),
            'div > button.btn-primary');

        button.simulate('click');

        expect(wasCalled).toBe(true);
    });
});
