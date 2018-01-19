import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import RoomInfo from './RoomInfo';

function dummyFunction() {}

describe('RoomInfo', () => {
  const roomInfo = (
    <RoomInfo
      room={{
        roomName: 'test room name',
        description: 'test description',
        phoneInfo: 'test phone info'
      }}
      onEditRequest={dummyFunction}
    />
  );

  const defaultProps = roomInfo.props;
  const defaultRoom = defaultProps.room;
  const enzymeHelper = new EnzymeHelper(roomInfo);

  it('should render room name', () => {
    enzymeHelper.shallow();
    const div = enzymeHelper.findSingle(
      'div.panel > div.room-info-panel-heading > div.room-info-panel-title'
    );
    expect(div.text()).toBe(defaultRoom.roomName);
  });

  it('should render description', () => {
    enzymeHelper.shallow();
    const p = enzymeHelper.findSingle(
      'div.panel > div.panel-body > p#roomDescription'
    );
    expect(p.text()).toBe(defaultRoom.description);
  });

  it('should render phone info', () => {
    enzymeHelper.shallow();
    const p = enzymeHelper.findSingle(
      'div.panel > div.panel-body > p#roomPhoneInfo'
    );
    expect(p.text()).toContain(defaultRoom.phoneInfo);
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
  ].forEach(scenario => {
    it(
      `should${scenario.shouldShowBody ? '' : ' not'} render panel-body` +
        ` when ${scenario.situation}`,
      () => {
        enzymeHelper.shallow({
          onEditRequest: defaultProps.onEditRequest,
          room: Object.assign({}, defaultRoom, scenario.roomAdjustments)
        });

        const found = enzymeHelper.find('div.panel > div.panel-body');

        expect(found.length).toEqual(scenario.shouldShowBody ? 1 : 0);
      }
    );
  });
});
