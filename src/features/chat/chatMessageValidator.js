import {validateFields, missingRequiredValue} from '../../util/validationHelper';

export function validate(chatMessage) {
    return validateFields([{
        fieldName: 'text',
        predicate: missingRequiredValue(chatMessage.text),
        errorMessage: 'Message is required.'
    }]);
}
