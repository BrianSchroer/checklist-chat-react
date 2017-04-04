import React from 'react';
import initialState from '../../../app/store/initialState';
import {shallow, enzymeHelper, snapshotHelper} from '../../../util/testHelpers';
import {ChatParticipantsModal, mapStateToProps} from './ChatParticipantsModal';

const defaultProps = {
    chatParticipants: [],
    onCloseRequest: () => {},
    actions: {}
};

const defaultOwnProps = {
    onCloseRequest: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<ChatParticipantsModal {...props} />);
}

function callMapStateToProps(stateOverrides, ownPropsOverrides) {
    const state = Object.assign({}, initialState, stateOverrides || {});
    const ownProps = Object.assign({}, defaultOwnProps, ownPropsOverrides || {});

    return mapStateToProps(state, ownProps);
}

describe('ChatParticipantsModal', () => {
    it('should render Modal with expected title', () => {
        const testParticipants = [1, 2, 3, 4, 5].map(i => ({
            name:  `name ${i}`,
            department: `department ${i}`,
            title: `title ${i}`,
            connection: `connection ${i}`
        }));

        const table = enzymeHelper.findSingle(render({chatParticipants: testParticipants}),
            'Modal > div.chat-participants > table');

        enzymeHelper.assertFindCount(4, table, 'thead > tr > th');

        const tbody = enzymeHelper.findSingle(table, 'tbody');
        const rows = enzymeHelper.find(tbody, 'tr');
        expect(rows.length).toEqual(testParticipants.length);

        const expected = testParticipants[0];
        const actual = enzymeHelper.find(rows.first(), 'td');
        expect(actual.at(0).text()).toEqual(expected.name);
        expect(actual.at(1).text()).toEqual(expected.department);
        expect(actual.at(2).text()).toEqual(expected.title);
        expect(actual.at(3).text()).toEqual(expected.connection);
    });

    it('should render chat participants table', () => {
        expect(enzymeHelper.findSingle(render(), 'Modal').props().title).toBe("Who's Here?");
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
