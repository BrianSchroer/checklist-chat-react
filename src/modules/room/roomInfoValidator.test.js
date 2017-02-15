import {expect} from '../../util/testHelpers';
import {validate} from './roomInfoValidator';

const nameRequiredError = 'Room name is required.';

describe('roomInfoValidator', () => {
    [
        { chatMessage: {roomName: null}, field: 'roomName', isValid: false, error: nameRequiredError },
        { chatMessage: {roomName: undefined}, field: 'roomName', isValid: false, error: nameRequiredError },
        { chatMessage: {roomName: ''}, field: 'roomName', isValid: false, error: nameRequiredError },
        { chatMessage: {roomName: ' '}, field: 'roomName', isValid: false, error: nameRequiredError },
        { chatMessage: {roomName: 'Coordinated Deployment'}, field: 'roomName', isValid: true },
        { chatMessage: {roomName: 'Bug Bash'}, field: 'roomName', isValid: true }
    ]
    .forEach(scenario => {

        const field = scenario.field;

        it('should return expected response for '
            + `${field}: "${scenario.chatMessage[field]}"`, () => {

            const validationResponse = validate(scenario.chatMessage);

            expect(validationResponse.isValid).toEqual(scenario.isValid);

            if (scenario.isValid) {
                expect(Object.keys(validationResponse.errors).length).toBe(0);
            } else {
                expect(validationResponse.errors[field]).toEqual(scenario.error);
            }
        });
    });
});
