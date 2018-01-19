import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import { HomePage } from './HomePage';

function dummyFunction() {}

describe('HomePage', () => {
  const homePage = (
    <HomePage
      rooms={[{ roomName: 'test room name' }]}
      actions={{
        setRoomId: dummyFunction,
        requestRoomInfoModalDialog: dummyFunction
      }}
    />
  );

  const defaultProps = homePage.props;
  const enzymeHelper = new EnzymeHelper(homePage);

  function findNoRoomsParagraph(renderedWrapper) {
    return enzymeHelper.findIn(
      renderedWrapper,
      'div.home-page > div.row > div > div.jumbotron > p.lead'
    );
  }

  it('should render a RoomList', () => {
    enzymeHelper.shallow();
    const elem = enzymeHelper.findSingle(
      'div.home-page > div.row > div > RoomList'
    );
    expect(elem.props().rooms).toBe(defaultProps.rooms);
  });

  it('should display a "start a chat" message when there are no rooms', () => {
    const p = findNoRoomsParagraph(enzymeHelper.shallow({ rooms: [] }));
    expect(p.length).toEqual(1);
    expect(p.text()).toEqual(
      "There aren't any chats in progress right now. Why not start one?"
    );
  });

  it('should not display a "start a chat" message when there are rooms', () => {
    const p = findNoRoomsParagraph(
      enzymeHelper.shallow({ rooms: [{ roomName: 'room 1' }] })
    );
    expect(p.length).toEqual(0);
  });

  it('should handle new chat room request', () => {
    let wasCalled = false;
    let actualRoomId = undefined;

    const testActions = {
      requestRoomInfoModalDialog: roomId => {
        wasCalled = true;
        actualRoomId = roomId;
      }
    };

    const actions = Object.assign({}, defaultProps.actions, testActions);

    const wrapper = enzymeHelper.shallow({ actions });

    const button = enzymeHelper.findSingleIn(wrapper, 'input');
    button.simulate('click');

    expect(wasCalled);
    expect(actualRoomId).toBe(null);
  });
});
