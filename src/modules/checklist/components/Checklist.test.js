import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import Checklist from './Checklist';

const tableSelector = 'div.checklist-table-container > table.checklist-table';

const defaultProps = {
    checklistItems: [
        { id: 1, sequenceNumber: 1 },
        { id: 2, sequenceNumber: 2 }
    ],
    onEditRequest: () => {}
};

function render(propOverrides) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<Checklist {...props}/>);
}

function renderTable(propOverrides) {
    return enzymeHelper.findSingle(render(propOverrides), tableSelector);
}

describe('Checklist', () => {
    describe('with no existing items', () => {
        const table = renderTable({checklistItems: []});

        it('should not render ChecklistItem rows', () => {
            const rows = enzymeHelper.find(table, 'ChecklistItem');
            expect(rows.length).toEqual(0);
        });

        it('should render a ChecklistAddInvitation', () => {
            enzymeHelper.findSingle(table, 'ChecklistAddInvitation');
        });
    });

    describe('with existing items', () => {
        const table = renderTable();

        it('should render ChecklistItem rows', () => {
            const rows = enzymeHelper.find(table, 'ChecklistItem');
            expect(rows.length).toEqual(defaultProps.checklistItems.length);
        });

        it('should not render a ChecklistAddInvitation', () => {
            const invitationElements = enzymeHelper.find(table, 'ChecklistAddInvitation');
            expect(invitationElements.length).toEqual(0);
        });
    });
});
