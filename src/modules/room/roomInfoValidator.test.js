import { validate } from './roomInfoValidator';

const nameRequiredError = 'Room name is required.';

describe('roomInfoValidator', () => {
  [
    {
      roomInfo: { roomName: null },
      field: 'roomName',
      isValid: false,
      error: nameRequiredError
    },
    {
      roomInfo: { roomName: undefined },
      field: 'roomName',
      isValid: false,
      error: nameRequiredError
    },
    {
      roomInfo: { roomName: '' },
      field: 'roomName',
      isValid: false,
      error: nameRequiredError
    },
    {
      roomInfo: { roomName: ' ' },
      field: 'roomName',
      isValid: false,
      error: nameRequiredError
    },
    {
      roomInfo: { roomName: 'Coordinated Deployment' },
      field: 'roomName',
      isValid: true
    },
    { roomInfo: { roomName: 'Bug Bash' }, field: 'roomName', isValid: true }
  ].forEach(scenario => {
    const field = scenario.field;

    it(
      'should return expected response for ' +
        `${field}: "${scenario.roomInfo[field]}"`,
      () => {
        const validationResponse = validate(scenario.roomInfo);

        expect(validationResponse.isValid).toEqual(scenario.isValid);

        if (scenario.isValid) {
          expect(Object.keys(validationResponse.errors).length).toBe(0);
        } else {
          expect(validationResponse.errors[field]).toEqual(scenario.error);
        }
      }
    );
  });
});
