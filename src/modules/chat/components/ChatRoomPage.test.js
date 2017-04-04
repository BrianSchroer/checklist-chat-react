import React from 'react';
import initialState from '../../../app/store/initialState';
import {snapshotHelper} from '../../../util/testHelpers';
import {ChatRoomPage, mapStateToProps} from './ChatRoomPage';

const defaultProps = {
    routeParams: {},
    userId: 'TestUserId',
    room: {id: 123},
    checklistItems: [],
    chatMessages: [],
    actions: {
        joinChat: () => {}
    }
};

function overrideProps(propOverrides) {
    return Object.assign({}, defaultProps, propOverrides);
}

function assertSnapshotMatch(propOverrides = {}) {
    snapshotHelper.assertMatch(<ChatRoomPage {...overrideProps(propOverrides)} />);
}

function callMapStateToProps(stateOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    return mapStateToProps(state);
}

describe('ChatRoomPage', () => {
    it('should render correctly', () => {
        assertSnapshotMatch();
    });

    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const stateOverrides =
            {
                roomId: 666,
                rooms: [ {id: 666} ]
            };
            const props = callMapStateToProps(stateOverrides);

            expect(props.userId).toBe(initialState.userId);
            expect(props.room.id).toBe(stateOverrides.roomId);
            expect(props.checklistItems).toBe(initialState.checklistItems);
            expect(props.chatMessages).toBe(initialState.chatMessages);
        });
    })
});
