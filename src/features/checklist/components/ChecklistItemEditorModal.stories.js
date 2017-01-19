import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import * as checklistItemStatus from '../checklistItemStatus';
import {ChecklistItemEditorModal} from './ChecklistItemEditorModal';

storiesOf('ChecklistItemEditorModal', module)

    .add('new item', () => (
        <ChecklistItemEditorModal
            userId="userId"
            checklistItem={{
                id: null,
                roomId: 123,
                sequenceNumber: 3,
                status: checklistItemStatus.NOT_STARTED,
                description: null,
                scheduledStartTime: null,
                scheduledEndTime: null,
                actualStartTime: null,
                actualEndTime: null
            }}
            isNewChecklistItem="true"
            maxSequenceNumber="3"
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
        />
    ))

    .add('existing item', () => (
        <ChecklistItemEditorModal
            userId="userId"
            checklistItem={{
                id: 123,
                roomId: 123,
                sequenceNumber: 3,
                status: checklistItemStatus.IN_PROGRESS,
                description: "description",
                scheduledStartTime: '2016-12-08T14:00:00.222Z',
                scheduledEndTime: '2016-12-08T15:00:00.222Z',
                actualStartTime: '2016-12-08T14:03:00.222Z',
                actualEndTime: null,
                userName: 'Jabba Script'
            }}
            isNewChecklistItem="true"
            maxSequenceNumber="3"
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
        />
    ));
