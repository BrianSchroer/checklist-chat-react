import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import ChecklistItemComment from './ChecklistItemComment';

storiesOf('ChecklistItemComment', module)
    .addDecorator(storybookFrameDecorator)

    .add('short comment', () => (
        <table className="table checklist-table">
            <tbody>
                <ChecklistItemComment
                    chatMessage={{
                        timeStamp: '2016-12-08T14:00:00.222Z',
                        userName: "Jabba Script",
                        text: "The deployment is going great!"
                    }} />
            </tbody>
        </table>
    ))

    .add('long comment', () => (
        <table className="table checklist-table">
            <tbody>
                <ChecklistItemComment
                    chatMessage={{
                        timeStamp: '2016-12-08T14:00:00.222Z',
                        userName: "Jabba Script",
                        text: "I'm Slim Shady, yes I'm the real Shady. All you other Slim Shadys are just imitating So won't the real Slim Shady please stand up, Please stand up, please stand up?" }} />
            </tbody>
        </table>
    ));
