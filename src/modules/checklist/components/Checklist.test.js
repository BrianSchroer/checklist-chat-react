import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import Checklist from './Checklist';
import * as checklistItemStatus from '../checklistItemStatus';

const defaultProps = {
    checklistItems: [],
    onEditRequest: () => {}
};

function overrideProps(propOverrides) {
    return Object.assign({}, defaultProps, propOverrides);
}

function assertSnapshotMatch(propOverrides = {}) {
    snapshotHelper.assertMatch(<Checklist {...overrideProps(propOverrides)} />);
}

describe('Checklist', () => {
    describe('with no existing items', () => {
        it('should render correctly', () => {
            assertSnapshotMatch({checklistItems: []});
        });
   });

    describe('with existing items', () => {
        it('should render correctly', () => {
            assertSnapshotMatch({
                checklistItems: [
                    { id: 1, sequenceNumber: 1, status: checklistItemStatus.IN_PROGRESS },
                    { id: 2, sequenceNumber: 2, status: checklistItemStatus.NOT_STARTED }
                ]
            });
        });
   });
});
