import expect from 'expect';
import deepFreeze from 'deep-freeze';
import * as roomDucks from './roomDucks';

const initialState = {
    rooms: [],
    roomId: null,
    roomInfo: null
};

deepFreeze(initialState);

describe('roomDucks', () => {
    describe('roomsReducer', () => {
        it('should return expected value for LOAD_ROOMS_SUCCESS', () => {
            const rooms = [ {roomId: 1}, {roomId: 2} ];
            const action = { type: roomDucks.LOAD_ROOMS_SUCCESS, rooms };

            expect(roomDucks.roomsReducer(initialState.rooms, action))
                .toEqual(rooms);
        });

        [ 'unexpected action type', undefined ].forEach(actionType => {
            it(`should return original value for unexpected action type "${actionType}"`, () => {
                expect(roomDucks.roomsReducer(initialState.rooms, {type: actionType}))
                    .toEqual(initialState.rooms);
            });
        });
    });

    describe('roomIdReducer', () => {
        it('should return expected value for SET_ROOM_ID_SUCCESS', () => {
            const roomId = 3928;
            const action = { type: roomDucks.SET_ROOM_ID_SUCCESS, roomId };

            expect(roomDucks.roomIdReducer(initialState.rooms, action))
                .toEqual(roomId);
        });

        [ 'unexpected action type', undefined ].forEach(actionType => {
            it(`should return original value for unexpected action type "${actionType}"`, () => {
                expect(roomDucks.roomIdReducer(initialState.roomId, {type: actionType}))
                    .toEqual(initialState.roomId);
            });
        });
    });

    describe('roomInfoReducer', () => {
        it('should return expected value for SET_ROOM_INFO_SUCCESS', () => {
            const roomInfo = { roomId: 32827, roomName: 'new room'};
            const action = { type: roomDucks.SET_ROOM_INFO_SUCCESS, roomInfo };

            expect(roomDucks.roomInfoReducer(initialState.roomInfo, action))
                .toEqual(roomInfo);
        });

        [ 'unexpected action type', undefined ].forEach(actionType => {
            it(`should return original value for unexpected action type "${actionType}"`, () => {
                expect(roomDucks.roomInfoReducer(initialState.roomInfo, {type: actionType}))
                    .toEqual(initialState.roomInfo);
            });
        });
    });
});
