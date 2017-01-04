import expect from 'expect';
import {validate} from './checklistItemValidator';

const descriptionRequiredError = 'Description is required.';

describe('checklistItemValidator', () => {
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
