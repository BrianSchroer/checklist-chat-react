export function validate(checklistItem) {
    const errors = {};

    if ((checklistItem.description || '').trim().length === 0) {
        errors.description = 'Description is required.';
    }

    return {isValid: Object.keys(errors).length === 0, errors};
}
