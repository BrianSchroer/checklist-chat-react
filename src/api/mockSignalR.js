import 'whatwg-fetch';

const mockJsonServerBaseUri = 'http://localhost:3001/';

export function addChecklistItem(roomId, checklistItem) {
    const userId = getUserName();
    const {sequenceNumber, description} = checklistItem;
    const body = Object.assign({}, checklistItem, {roomId});

    getChecklistItems().then(items => {
        let ids = items.map(item => item.id);
        body.id = Math.max(...ids) + 1;
    });

    const actionMessage = {
        chatMessageType: 'Action',
        text: `added checklist item ${sequenceNumber} - "${description}".`
    };

    chat(actionMessage, roomId, userId);

    return add(`checklistItems`, JSON.stringify(body));
}

export function getUserName() {
    return 'Brian Schroer';
}

export function getRooms() {
    return get('rooms');
}

export function getChatMessages(roomId) {
    return get(`chatMessages?roomId=${roomId}&_sort=timeStamp`);
}

export function getChecklistItems(roomId) {
    return (roomId)
        ? get(`checklistItems?roomId=${roomId}&_sort=sequenceNumber`)
        : get('checklistItems');
}

export function updateRoomInfo(roomInfo, userId) {
    const body = Object.assign({}, roomInfo);

    const actionMessage = {chatMessageType: 'Action'};

    if (roomInfo.id) {
        actionMessage.text = 'updated the room description / phone info.';
        chat(actionMessage, body.id, userId);
        return update(`rooms/${roomInfo.id}`, JSON.stringify(body));
    } else {
        get('rooms').then(items => {
            let ids = items.map(item => item.id);
            body.id = Math.max(...ids) + 1;
            actionMessage.text = `created new chat "${body.roomName}".`;
            chat(actionMessage, body.id, userId);
        });
        return add(`rooms`, JSON.stringify(body));
    }
}

export function joinChat(roomId, userId) {
    const actionMessage = {
        chatMessageType: 'Action',
        text: 'entered the room.'
    };

    return chat(actionMessage, roomId, userId);
}

export function chat(chatMessage, roomId, userId) {
    const body = Object.assign(
        {},
        chatMessage,
        {roomId: roomId, userName: userId}
    );

    assignChatMessageIdAndTimestamp(body);

    return add(`chatMessages`, JSON.stringify(body));
}

export function saveChecklistItemComment(checklistItem, comment, userId) {
    const {roomId, sequenceNumber, description} = checklistItem;

    const actionMessage = {
        chatMessageType: 'Action',
        text: `added a comment to checklist item ${sequenceNumber} - "${description}".`
    };

    chat(actionMessage, roomId, userId);

    const body = Object.assign({}, checklistItem);

    const chatMessage = {
        chatMessageType: 'Chat',
        userName: userId,
        text: comment
    };
    assignChatMessageIdAndTimestamp(chatMessage);

    if (body.chatMessages) {
        body.chatMessages.push(chatMessage);
    } else {
        body.chatMessages = [chatMessage];
    }

    return update(`checklistItems/${checklistItem.id}`, JSON.stringify(body));
}

export function updateChecklistItem(roomId, checklistItem) {
    const userId = getUserName();
    const {sequenceNumber, description} = checklistItem;
    const body = Object.assign({}, checklistItem, {roomId});

    const actionMessage = {
        chatMessageType: 'Action',
        text: `updated checklist item ${sequenceNumber} - "${description}".` };

    chat(actionMessage, roomId, userId);

    return update(`checklistItems/${checklistItem.id}`, JSON.stringify(body));
}

function assignChatMessageIdAndTimestamp(chatMessage) {
    let id;
    getChatMessages().then(items => {
        const ids = items.map(item => item.id);
        id = Math.max(...ids) + 1;
    });

    chatMessage.id = id;
    chatMessage.timeStamp = new Date().toISOString();
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
