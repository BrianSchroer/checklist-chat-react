import expect from 'expect';
import * as validationHelper from './validationHelper';

describe('validationHelper.validateField', () => {
    const testFieldName = 'testFieldName';
    const testErrorMessage = 'test error message';

    it('should set an error property when predicate is true', () => {
        const errors = {};
        validationHelper.validateField(errors, true, testFieldName, testErrorMessage);
        expect(errors[testFieldName]).toEqual(testErrorMessage);
    });

    it('should not set an error property when predicate is false', () => {
        const errors = {};
        validationHelper.validateField(errors, false, testFieldName, testErrorMessage);
        expect(errors[testFieldName]).toBe(undefined);
    });
});

describe('validationHelper.validateFields', () => {
    it('should return expected validationResult when there are errors', () => {
        const validationResult = validationHelper.validateFields([
            { predicate: true, fieldName: 'fieldName1', errorMessage: 'Error 1' },
            { predicate: false, fieldName: 'fieldName2', errorMessage: 'Error 2' },
            { predicate: true, fieldName: 'fieldName3', errorMessage: 'Error 3' }
        ]);

        expect(validationResult.isValid).toEqual(false);
        const errors = validationResult.errors;
        expect(errors['fieldName1']).toEqual('Error 1');
        expect(errors['fieldName2']).toBe(undefined);
        expect(errors['fieldName3']).toEqual('Error 3');
    });
});

describe('validationHelper.validateFields', () => {
    it('should return expected validationResult when there are no errors', () => {
        const validationResult = validationHelper.validateFields([
            { predicate: false, fieldName: 'fieldName1', errorMessage: 'Error 1' },
            { predicate: false, fieldName: 'fieldName2', errorMessage: 'Error 2' },
            { predicate: false, fieldName: 'fieldName3', errorMessage: 'Error 3' }
        ]);

        expect(validationResult.isValid).toEqual(true);
        expect(Object.keys(validationResult.errors).length).toEqual(0);
    });
});

describe('validationHelper.missingRequiredValue', () => {
    [
        { value: 'Test value', isMissing: false },
        { value: 'X', isMissing: false },
        { value: null, isMissing: true },
        { value: undefined, isMissing: true },
        { value: '', isMissing: true },
        { value: '     ', isMissing: true }
    ]
    .forEach(scenario => {
        it(`should return ${scenario.isMissing} for the value "${scenario.value}"`, () => {
            expect(validationHelper.missingRequiredValue(scenario.value)).toEqual(scenario.isMissing);
        });
    });
});
