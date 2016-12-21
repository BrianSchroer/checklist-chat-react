import 'whatwg-fetch';

const mockJsonServerBaseUri = 'http://localhost:3001/';

export function getRooms() {
   return get('rooms');
}

export function getRoomInfo(roomId) {
   return get(`rooms/${roomId}`);
}

export function addRoom(roomInfo) {
    return add('rooms', roomInfo);
}

export function updateRoom(roomInfo) {
    return update('rooms', roomInfo);
}

function get(url) {
    return fetch(mockJsonServerBaseUri + url).then(onSuccess, onError);
}

function add(url, item) {
    const request = new Request(mockJsonServerBaseUri + url, {method: 'POST', body: item});
    return fetch(request).then(onSuccess, onError);
}

function update(url, item) {
    const request = new Request(mockJsonServerBaseUri + url, {method: 'PUT', body: item});
    return fetch(request).then(onSuccess, onError);
}

// (Can't call this function 'delete' because that's a JavaScript reserved word)
function del(url) {
    const request = new Request(mockJsonServerBaseUri + url, {method: 'DELETE'});
    return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}
