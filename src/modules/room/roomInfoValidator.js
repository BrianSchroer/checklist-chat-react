import { validationHelper } from '../../util';

export function validate(roomInfo) {
  return validationHelper.validateFields([
    {
      fieldName: 'roomName',
      predicate: validationHelper.missingRequiredValue(roomInfo.roomName),
      errorMessage: 'Room name is required.'
    }
  ]);
}
