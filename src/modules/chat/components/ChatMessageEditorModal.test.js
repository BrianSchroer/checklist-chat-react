import expect from 'expect';
import React from 'react';
import initialState from '../../../app/store/initialState';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import {ChatMessageEditorModal, mapStateToProps} from './ChatMessageEditorModal';

const defaultProps = {
    userId: 'TestUserId',
    roomId: '123',
    onCloseRequest: () => {},
    actions: {}
};

const defaultOwnProps = {
    onCloseRequest: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<ChatMessageEditorModal {...props} />);
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('ChatMessageEditorModal', () => {
    it('should render Modal with expected title', () => {
        expect(enzymeHelper.findSingle(render(), 'Modal').props().title).toBe('Say Something...');
    });

    it('should render TextInput', () => {
        const textInput = enzymeHelper.findSingle(render(), 'Modal > TextInput');
        expect(textInput.props().name).toBe('text');
        expect(textInput.props().label).toBe('Message');
        expect(textInput.props().rows).toBe(3);
        expect(textInput.props().value).toBe('');
        expect(textInput.props().error).toBe(undefined);
    });

    describe('mapStateToProps', () => {
        it('should return expected props', () => {
            const stateOverrides = { roomId: 666 };
            const props = callMapStateToProps(stateOverrides);

            expect(props.userId).toBe(initialState.userId);
            expect(props.roomId).toBe(stateOverrides.roomId);
            expect(props.shouldFocus).toBe(true);
            expect(props.onCloseRequest).toBe(defaultOwnProps.onCloseRequest);
        });
    });
});
