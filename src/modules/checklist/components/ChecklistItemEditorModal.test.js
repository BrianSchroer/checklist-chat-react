import React from 'react';
import initialState from '../../../app/store/initialState';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import {
  ChecklistItemEditorModal,
  emptyChecklistItem,
  mapStateToProps
} from './ChecklistItemEditorModal';
import * as checklistItemStatus from '../checklistItemStatus';

const defaultProps = {
  checklistItem: {
    roomId: 123,
    sequenceNumber: 1,
    status: checklistItemStatus.NOT_STARTED,
    description: 'item description',
    scheduledStartTime: '2016-12-08T14:00:00.222Z',
    scheduledEndTime: '2016-12-08T15:00:00.222Z',
    actualStartTime: '2016-12-08T14:03:00.222Z',
    actualEndTime: '2016-12-08T15:30:00.222Z',
    userName: 'Jabba Script'
  },
  isNewChecklistItem: false,
  maxSequenceNumber: 3,
  onCloseRequest: () => {},
  actions: {}
};

const defaultOwnProps = {
  onCloseRequest: () => {}
};

function overrideProps(propOverrides) {
  return Object.assign({}, defaultProps, propOverrides);
}

function assertSnapshotMatch(propOverrides = {}) {
  SnapshotHelper.test(
    <ChecklistItemEditorModal {...overrideProps(propOverrides)} />
  );
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
  const state = Object.assign({}, initialState, stateOverrides || {});
  const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

  return mapStateToProps(state, ownProps);
}

describe('ChecklistItemEditorModal', () => {
  describe('for existing item', () => {
    it('should render correctly', () => {
      assertSnapshotMatch();
    });
  });

  describe('for new item', () => {
    it('should render correctly', () => {
      assertSnapshotMatch({ checklistItem: emptyChecklistItem(1, 3) });
    });
  });

  describe('mapStateToProps', () => {
    it('should return expected props for existing item', () => {
      const testChecklistItem = defaultProps.checklistItem;

      const stateOverrides = {
        modalDialogRequest: {
          keys: [testChecklistItem.roomId, testChecklistItem.sequenceNumber]
        },
        checklistItems: [testChecklistItem]
      };

      const props = callMapStateToProps(stateOverrides);

      expect(props.checklistItem).toBe(testChecklistItem);
      expect(props.isNewChecklistItem).toBe(false);
      expect(props.maxSequenceNumber).toBe(testChecklistItem.sequenceNumber);
      expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
    });

    it('should return expected props for new item', () => {
      const testRoomId = defaultProps.checklistItem.roomId;

      const stateOverrides = {
        modalDialogRequest: { keys: [testRoomId, 0] },
        checklistItems: [defaultProps.checklistItem]
      };

      const props = callMapStateToProps(stateOverrides);

      expect(props.checklistItem.roomId).toBe(testRoomId);
      expect(props.checklistItem.sequenceNumber).toBe(2);
      expect(props.isNewChecklistItem).toBe(true);
      expect(props.maxSequenceNumber).toBe(2);
      expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
    });
  });
});
