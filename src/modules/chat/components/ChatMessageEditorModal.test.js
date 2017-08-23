import React from 'react';
import initialState from '../../../app/store/initialState';
import {snapshotHelper} from '../../../util/testHelpers';
import {ChatMessageEditorModal, mapStateToProps} from './ChatMessageEditorModal';

const defaultProps = {
    roomId: '123',
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
    snapshotHelper.assertMatch(<ChatMessageEditorModal {...overrideProps(propOverrides)} />);
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('ChatMessageEditorModal', () => {
    it('should render correctly', () => {
        assertSnapshotMatch();
    });

    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const stateOverrides = { roomId: 666 };
            const props = callMapStateToProps(stateOverrides);

            expect(props.roomId).toBe(stateOverrides.roomId);
            expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
        });
    });
});
