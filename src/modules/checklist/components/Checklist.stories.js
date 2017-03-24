import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import {checklistItemStatus} from '../../checklist';
import Checklist from './Checklist';

storiesOf('Checklist', module)
    .addDecorator(storybookFrameDecorator)

    .add('with checklist items', () => (
        <Checklist
            checklistItems={[
                {
                    sequenceNumber: 1,
                    status: checklistItemStatus.IN_PROGRESS,
                    description: "item description",
                    scheduledStartTime: '2016-12-08T14:00:00.222Z',
                    scheduledEndTime: '2016-12-08T15:00:00.222Z',
                    actualStartTime: '2016-12-08T14:03:00.222Z',
                    actualEndTime: null,
                    userName: 'Jabba Script'
                },
                {
                    sequenceNumber: 2,
                    status: checklistItemStatus.NOT_STARTED,
                    description: "itemdescription",
                    scheduledStartTime: '2016-12-08T14:00:00.222Z',
                    scheduledEndTime: '2016-12-08T15:00:00.222Z',
                    actualStartTime: null,
                    actualEndTime: null,
                    userName: 'Jabba Script',
                    chatMessages: [
                        { timeStamp: '2016-12-08T13:00:00.222Z', userName: 'Jabba Script', text: "I can't wait to start!" },
                        { timeStamp: '2016-12-08T13:01:00.222Z', userName: 'Sue Pervisor', text: "Hold your horses, big guy." }
                    ]
                }
            ]}
            onEditRequest={linkTo('ChecklistItemEditorModal', 'existing item')} />
    ))

    .add('without checklist items', () => (
        <Checklist
            checklistItems={[]}
            onEditRequest={action('onEditRequest')} />
    ));
