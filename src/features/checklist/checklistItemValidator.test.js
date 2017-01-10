import expect from 'expect';
import {validate, validateComment} from './checklistItemValidator';

describe('checklistItemValidator', () => {
    const descriptionRequiredError = 'Description is required.';

    [
        { checklistItem: {description: null}, field: 'description', isValid: false, error: descriptionRequiredError },
        { checklistItem: {description: undefined}, field: 'description', isValid: false, error: descriptionRequiredError },
        { checklistItem: {description: ''}, field: 'description', isValid: false, error: descriptionRequiredError },
        { checklistItem: {description: ' '}, field: 'description', isValid: false, error: descriptionRequiredError },
        { checklistItem: {description: 'Web site deployment'}, field: 'description', isValid: true },
        { checklistItem: {description: 'A'}, field: 'description', isValid: true }
    ]
    .forEach(scenario => {

        const field = scenario.field;

        it('should return expected response for '
            + `${field}: "${scenario.checklistItem[field]}"`, () => {

            const validationResponse = validate(scenario.checklistItem);

            expect(validationResponse.isValid).toEqual(scenario.isValid);

            if (scenario.isValid) {
                expect(Object.keys(validationResponse.errors).length).toBe(0);
            } else {
                expect(validationResponse.errors[field]).toEqual(scenario.error);
            }
        });
    });
});

describe('checklistItemValidator.validateComment', () => {
    const textRequiredError = 'Please enter a comment.';

    [
        { comment: {text: null}, field: 'text', isValid: false, error: textRequiredError },
        { comment: {text: undefined}, field: 'text', isValid: false, error: textRequiredError },
        { comment: {text: ''}, field: 'text', isValid: false, error: textRequiredError },
        { comment: {text: ' '}, field: 'text', isValid: false, error: textRequiredError },
        { comment: {text: 'This task will be delayed'}, field: 'text', isValid: true },
        { comment: {text: 'A'}, field: 'text', isValid: true }
    ]
    .forEach(scenario => {

        const field = scenario.field;

        it('should return expected response for '
            + `${field}: "${scenario.comment[field]}"`, () => {

            const validationResponse = validateComment(scenario.comment);

            expect(validationResponse.isValid).toEqual(scenario.isValid);

            if (scenario.isValid) {
                expect(Object.keys(validationResponse.errors).length).toBe(0);
            } else {
                expect(validationResponse.errors[field]).toEqual(scenario.error);
            }
        });
    });
});
