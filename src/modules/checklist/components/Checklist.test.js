import React from 'react';
import { SnapshotHelper } from '../../../util/testHelpers';
import Checklist from './Checklist';
import * as checklistItemStatus from '../checklistItemStatus';

const defaultProps = {
  checklistItems: [],
  onEditRequest: () => { }
};

function dummyFunction() { }

describe('Checklist', () => {
  const snapshotHelper = new SnapshotHelper(
    <Checklist
      checklistItems={[]}
      onEditRequest={dummyFunction}
    />
  );

  describe('with no existing items', () => {
    it('should render correctly', () => {
      snapshotHelper.test({ checklistItems: [] });
    });
  });

  describe('with existing items', () => {
    it('should render correctly', () => {
      snapshotHelper.test({
        checklistItems: [
          { id: 1, sequenceNumber: 1, status: checklistItemStatus.IN_PROGRESS },
          { id: 2, sequenceNumber: 2, status: checklistItemStatus.NOT_STARTED }
        ]
      });
    });
  });
});
