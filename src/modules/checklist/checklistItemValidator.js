import validationHelper from '../../util/validationHelper';

export function validate(checklistItem) {
    return validationHelper.validateFields([{
        fieldName: 'description',
        predicate: validationHelper.missingRequiredValue(checklistItem.description),
        errorMessage: 'Description is required.'
    }]);
}

export function validateComment(comment) {
    return validationHelper.validateFields([{
        fieldName: 'text',
        predicate: validationHelper.missingRequiredValue(comment.text),
        errorMessage: 'Please enter a comment.'
    }]);
}
