import {validateFields, missingRequiredValue} from '../../util/validationHelper';

export function validate(checklistItem) {
    return validateFields([{
        fieldName: 'description',
        predicate: missingRequiredValue(checklistItem.description),
        errorMessage: 'Description is required.'
    }]);
}

export function validateComment(comment) {
    return validateFields([{
        fieldName: 'text',
        predicate: missingRequiredValue(comment.text),
        errorMessage: 'Please enter a comment.'
    }]);
}
