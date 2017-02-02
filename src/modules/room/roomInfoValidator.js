import validationHelper from '../../util/validationHelper';

export function validate(roomInfo) {
    return validationHelper.validateFields([{
        fieldName: 'roomName',
        predicate: validationHelper.missingRequiredValue(roomInfo.roomName),
        errorMessage: 'Room name is required.'
    }]);
}
