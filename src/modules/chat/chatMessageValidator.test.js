import {validate} from './chatMessageValidator';

const messageRequiredError = 'Message is required.';

describe('chatMessageValidator', () => {
    [
        { chatMessage: {text: null}, field: 'text', isValid: false, error: messageRequiredError },
        { chatMessage: {text: undefined}, field: 'text', isValid: false, error: messageRequiredError },
        { chatMessage: {text: ''}, field: 'text', isValid: false, error: messageRequiredError },
        { chatMessage: {text: ' '}, field: 'text', isValid: false, error: messageRequiredError },
        { chatMessage: {text: 'Good morning!'}, field: 'text', isValid: true },
        { chatMessage: {text: 'Hi'}, field: 'text', isValid: true }
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
