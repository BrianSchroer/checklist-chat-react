import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import RoomInfo from './RoomInfo';

const testRoom = {
    roomName: 'test room name',
    description: 'test description',
    phoneInfo: 'test phone info'
};

function render(roomOverrides = {}) {
    const props = {
        room: Object.assign({}, testRoom, roomOverrides),
        onEditRequest: () => {}
    };
    return shallow(<RoomInfo {...props} />);
}

describe('RoomInfo', () => {
    it('should render room name', () => {
        const div = enzymeHelper.findSingle(render(),
            'div.panel > div.room-info-panel-heading > div.room-info-panel-title');
        expect(div.text()).toBe(testRoom.roomName);
    });

    it('should render description', () => {
        const p = enzymeHelper.findSingle(render(),
            'div.panel > div.panel-body > p#roomDescription');
        expect(p.text()).toBe(testRoom.description);
    });

    it('should render phone info', () => {
        const p = enzymeHelper.findSingle(render(),
            'div.panel > div.panel-body > p#roomPhoneInfo');
        expect(p.text()).toContain(testRoom.phoneInfo);
    });

    [
        {
            situation: 'room has description and phoneInfo',
            roomAdjustments: { description: 'description', phoneInfo: 'phone info' },
            shouldShowBody: true
        },
        {
            situation: 'room has description, but no phoneInfo',
            roomAdjustments: { description: 'description', phoneInfo: '' },
            shouldShowBody: true
        },
        {
            situation: 'room has phoneInfo, but no description',
            roomAdjustments: { description: '', phoneInfo: 'phone info' },
            shouldShowBody: true
        },
        {
            situation: 'room has neither description nor phone info',
            roomAdjustments: { description: '', phoneInfo: '' },
            shouldShowBody: false
        }
    ]
    .forEach(scenario => {
        it(`should${(scenario.shouldShowBody) ? '' : ' not'} render panel-body`
            + ` when ${scenario.situation}`, () => {

            const found = enzymeHelper.find(
                render(scenario.roomAdjustments),'div.panel > div.panel-body');

            expect(found.length).toEqual((scenario.shouldShowBody) ? 1 : 0);
        });
    });
});
