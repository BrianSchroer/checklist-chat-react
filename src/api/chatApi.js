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

export function getChecklistItems(roomId) {
    return get(`checklistItems?roomId=${roomId}&_sort=sequenceNumber`);
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
        getRooms().then(rooms => {
            let roomIds = rooms.map(room => room.id);
            body.id = Math.max(...roomIds) + 1;
            return add(`rooms`, JSON.stringify(body));
        });
    }
}

function get(url) {
    return fetch(mockJsonServerBaseUri + url).then(onSuccess, onError);
}

function add(url, body) {
    return fetch(
        mockJsonServerBaseUri + url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then(onSuccess, onError);
}

function update(url, body) {
    return fetch(
        mockJsonServerBaseUri + url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then(onSuccess, onError);
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
