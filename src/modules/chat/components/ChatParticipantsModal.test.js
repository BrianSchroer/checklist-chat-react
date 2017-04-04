import React from 'react';
import initialState from '../../../app/store/initialState';
import {snapshotHelper} from '../../../util/testHelpers';
import {ChatParticipantsModal, mapStateToProps} from './ChatParticipantsModal';

const defaultProps = {
    chatParticipants: [1, 2, 3, 4, 5].map(i => ({
            name:  `name ${i}`,
            department: `department ${i}`,
            title: `title ${i}`,
            connection: `connection ${i}`
        })),
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
    snapshotHelper.assertMatch(<ChatParticipantsModal {...overrideProps(propOverrides)} />);
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('ChatParticipantsModal', () => {
    it('should render correctly', () => {
        assertSnapshotMatch();
    });

    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const stateOverrides = { roomId: 666 };
            const props = callMapStateToProps(stateOverrides);

            expect(props.chatParticipants).toBe(initialState.chatParticipants);
            expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
        });
    });
});
