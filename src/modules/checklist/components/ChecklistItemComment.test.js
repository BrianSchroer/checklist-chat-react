import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import ChecklistItemComment from './ChecklistItemComment';

describe('ChecklistItemComment', () => {
    it('should render correctly', () => {
        const props = {
            chatMessage: {
                timeStamp: '2016-12-08T14:57:10.222Z',
                userName: 'test userName',
                text: 'test text'
            }
        };

        snapshotHelper.assertMatch(<ChecklistItemComment {...props} />);
    });
});
