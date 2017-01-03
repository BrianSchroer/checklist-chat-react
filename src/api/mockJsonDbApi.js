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
    return (roomId)
        ? get(`checklistItems?roomId=${roomId}&_sort=sequenceNumber`)
        : get('checklistItems');
}

export function saveRoom(roomInfo) {
    const body = Object.assign({}, roomInfo);

    const newChatMessage = {
        timeStamp: new Date().toISOString(),
        chatMessageType: 'Action',
        userName: 'Brian Schroer'
    };

    if (roomInfo.id) {
        newChatMessage.roomId = body.id;
        newChatMessage.text = 'updated the room description / phone info';
        addChatMessage(newChatMessage);
        return update(`rooms/${roomInfo.id}`, JSON.stringify(body));
    } else {
        get('rooms').then(items => {
            let ids = items.map(item => item.id);
            body.id = Math.max(...ids) + 1;
            newChatMessage.roomId = body.id;
            newChatMessage.text = `created new chat "${body.roomName}"`;
            addChatMessage(newChatMessage);
        });
        return add(`rooms`, JSON.stringify(body));
    }
}

export function addChatMessage(chatMessage) {
    const body = Object.assign({}, chatMessage);

    getChatMessages().then(items => {
        let ids = items.map(item => item.id);
        body.id = Math.max(...ids) + 1;
    });
    return add(`chatMessages`, JSON.stringify(body));
}

export function saveChecklistItem(checklistItem) {
    const body = Object.assign({}, checklistItem);

    if (checklistItem.id) {
        return update(`checklistItems/${checklistItem.id}`, JSON.stringify(body));
    } else {
        getChecklistItems().then(items => {
            let ids = items.map(item => item.id);
            body.id = Math.max(...ids) + 1;
        });
        return add(`checklistItems`, JSON.stringify(body));
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
