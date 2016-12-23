import 'whatwg-fetch';

const mockJsonServerBaseUri = 'http://localhost:3001/';

export function getRooms() {
    return get('rooms');
}

export function getRoomInfo(roomId) {
    return get(`rooms/${roomId}`);
}

export function getChatMessages(roomId) {
    return get(`chatMessages?roomId=${roomId}&_sort=timeStamp`);
}

export function saveRoom(roomInfo) {
    const body = {
        id: roomInfo.id,
        roomName: roomInfo.roomName,
        description: roomInfo.description,
        phoneInfo: roomInfo.phoneInfo
    };

    if (roomInfo.id) {
        return update(`rooms/${roomInfo.id}`, JSON.stringify(body));
    } else {
        const rooms = getRooms();
        body.id = Math.max(rooms.map(room => room.id)) + 1;
        return add(`rooms/${body.id}`, JSON.stringify(body));
    }
}

function get(url) {
    return fetch(mockJsonServerBaseUri + url).then(onSuccess, onError);
}

function add(url, body) {
    const request = new Request(mockJsonServerBaseUri + url, { method: 'POST', body });
    return fetch(request).then(onSuccess, onError);
}

function update(url, body) {
    const request = new Request(mockJsonServerBaseUri + url, { method: 'PATCH', body });
    return fetch(request).then(onSuccess, onError);
}

// (Can't call this function 'delete' because that's a JavaScript reserved word)
// function del(url) {
//     const request = new Request(mockJsonServerBaseUri + url, { method: 'DELETE' });
//     return fetch(request).then(onSuccess, onError);
// }

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}
