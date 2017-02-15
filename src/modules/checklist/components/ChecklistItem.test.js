import React from 'react';
import {expect, shallow, enzymeHelper} from '../../../util/testHelpers';
import {format} from '../../../util';
import {checklistItemStatus} from '../../checklist';
import ChecklistItem from './ChecklistItem';

const defaultChecklistItem = {
    sequenceNumber: 1,
    status: checklistItemStatus.NOT_STARTED,
    description: "item description",
    scheduledStartTime: '2016-12-08T14:00:00.222Z',
    scheduledEndTime: '2016-12-08T15:00:00.222Z',
    actualStartTime: '2016-12-08T14:03:00.222Z',
    actualEndTime: '2016-12-08T15:30:00.222Z',
    userName: 'Jabba Script'
};

function render(checklistItemOverrides = {}) {
    const props = {
        checklistItem: Object.assign({}, defaultChecklistItem, checklistItemOverrides),
        onEditRequest: () => {}
    };

    return shallow(<ChecklistItem {...props} />);
}

describe('ChecklistItem', () => {

    describe('edit button column', () => {
        const selector = 'tbody > tr > td > button.checklist-item-button';

        it('should be rendered with sequence number', () => {
            const button = enzymeHelper.findSingle(render(), selector);
            expect(button.text()).toEqual(defaultChecklistItem.sequenceNumber);
        });

        it('should call onEditRequest when clicked', () => {
            let onEditRequestWasCalled = false;

            const props = {
                checklistItem: defaultChecklistItem,
                onEditRequest: () => {onEditRequestWasCalled = true;}
            };

            const button = enzymeHelper.findSingle(
                shallow(<ChecklistItem {...props} />),
                selector);

            button.simulate('click');
            expect(onEditRequestWasCalled).toBe(true);
        });
    });

    it('should render a status icon column', () => {
        const icon = enzymeHelper.findSingle(render(),
            'tbody > tr > td > ChecklistItemStatusIcon');

        expect(icon.props().status).toBe(defaultChecklistItem.status);
    });

    it('should render start/end time columns', () => {
        const clms = enzymeHelper.find(
            render(),
            'tbody > tr > td.timestamp > PlannedVsActual');

        expect(clms.length).toBe(2);

        let props = clms.at(0).props();
        expect(props.planned).toEqual(format.time(defaultChecklistItem.scheduledStartTime));
        expect(props.actual).toEqual(format.time(defaultChecklistItem.actualStartTime));

        props = clms.at(1).props();
        expect(props.planned).toEqual(format.time(defaultChecklistItem.scheduledEndTime));
        expect(props.actual).toEqual(format.time(defaultChecklistItem.actualEndTime));
    });

    it('should render a desription column', () => {
        const td = enzymeHelper.find(render(), 'tbody > tr > td').at(4);
        expect(td.text()).toEqual(defaultChecklistItem.description);
    });

    it('should render a "performed by" column', () => {
        const td = enzymeHelper.find(render(), 'tbody > tr > td').at(5);
        expect(td.text()).toEqual(defaultChecklistItem.userName);
    });
});
