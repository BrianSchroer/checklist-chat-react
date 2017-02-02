import {validationHelper} from '../../util';

export function validate(chatMessage) {
    return validationHelper.validateFields([{
        fieldName: 'text',
        predicate: validationHelper.missingRequiredValue(chatMessage.text),
        errorMessage: 'Message is required.'
    }]);
}
