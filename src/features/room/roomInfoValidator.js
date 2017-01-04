export function validate(roomInfo) {
    const errors = {};

    if ((roomInfo.roomName || '').trim().length === 0) {
        errors.roomName = 'Room name is required.';
    }

    return {isValid: Object.keys(errors).length === 0, errors};
}
