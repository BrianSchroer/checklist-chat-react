export function validate(chatMessage) {
    const errors = {};

    if ((chatMessage.text || '').trim().length === 0) {
        errors.text = 'Message is required.';
    }

    return {isValid: Object.keys(errors).length === 0, errors};
}
