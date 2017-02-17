import 'whatwg-fetch';

const mockJsonServerBaseUri = 'http://localhost:3001/';

export function addChecklistItem(roomId, checklistItem) {
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

    chat(roomId, actionMessage);

    return add(`checklistItems`, JSON.stringify(body));
}

export function addChecklistItemComment(roomId, checklistItemId, comment) {
    return get(`checklistItems/${checklistItemId}`).then(checklistItem => {
        const {sequenceNumber, description} = checklistItem;

        const commentMessage = assignChatMessageIdsAndTimestamp({chatMessageType: 'Chat', text: comment});

        const body = Object.assign({}, checklistItem);

        if (body.chatMessages) {
            body.chatMessages.push(commentMessage);
        } else {
            body.chatMessages = [commentMessage];
        }

        const actionMessage = {
            chatMessageType: 'Action',
            text: `added a comment to checklist item ${sequenceNumber} - "${description}".`
        };
        chat(roomId, actionMessage);

        return update(`checklistItems/${checklistItem.id}`, JSON.stringify(body));
    });
}

export function chat(roomId, chatMessage) {
    const body = assignChatMessageIdsAndTimestamp(Object.assign({}, chatMessage, {roomId}));

    return add(`chatMessages`, JSON.stringify(body));
}

export function getChatMessages(roomId) {
    return get(`chatMessages?roomId=${roomId}&_sort=timeStamp`);
}

export function getChecklistItems(roomId) {
    return (roomId)
        ? get(`checklistItems?roomId=${roomId}&_sort=sequenceNumber`)
        : get('checklistItems');
}

export function getRooms() {
    return get('rooms');
}

export function getUserName() {
    return 'Brian Schroer';
}

export function joinChat(roomId) {
    const actionMessage = {
        chatMessageType: 'Action',
        text: 'entered the room.'
    };

    return chat(roomId, actionMessage);
}

export function updateChecklistItem(roomId, checklistItem) {
    const {sequenceNumber, description} = checklistItem;
    const body = Object.assign({}, checklistItem, {roomId});

    const actionMessage = {
        chatMessageType: 'Action',
        text: `updated checklist item ${sequenceNumber} - "${description}".` };

    chat(roomId, actionMessage);

    return update(`checklistItems/${checklistItem.id}`, JSON.stringify(body));
}

export function updateRoomInfo(roomInfo) {
    const body = Object.assign({}, roomInfo);

    const actionMessage = {chatMessageType: 'Action'};

    if (roomInfo.id) {
        actionMessage.text = 'updated the room description / phone info.';
        chat(body.id, actionMessage);
        return update(`rooms/${roomInfo.id}`, JSON.stringify(body));
    } else {
        get('rooms').then(items => {
            let ids = items.map(item => item.id);
            body.id = Math.max(...ids) + 1;
            actionMessage.text = `created new chat "${body.roomName}".`;
            chat(body.id, actionMessage);
        });
        return add(`rooms`, JSON.stringify(body));
    }
}

function assignChatMessageIdsAndTimestamp(chatMessage) {
    let id;
    getChatMessages().then(items => {
        const ids = items.map(item => item.id);
        id = Math.max(...ids) + 1;
    });

    chatMessage.id = id;
    chatMessage.timeStamp = new Date().toISOString();
    chatMessage.userName = getUserName();

    return chatMessage;
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
