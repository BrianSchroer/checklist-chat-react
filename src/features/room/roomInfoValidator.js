import {validateFields, missingRequiredValue} from '../../util/validationHelper';

export function validate(roomInfo) {
    return validateFields([{
        fieldName: 'roomName',
        predicate: missingRequiredValue(roomInfo.roomName),
        errorMessage: 'Room name is required.'
    }]);
}
