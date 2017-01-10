/**
 * Is required value missing?
 *
 * @export
 * @param {string} value
 * @returns {bool}
 */
export function missingRequiredValue(value) {
    return ((value || '').trim().length === 0);
}

/**
 * If predicate is true, set errorMessage to errors fieldName errors property.
 *
 * @export
 * @param {object} errors
 * @param {bool} predicate
 * @param {string} fieldName
 * @param {string} errorMessage
 */
export function validateField(errors, predicate, fieldName, errorMessage) {
    if (predicate) {
        errors[fieldName] = errorMessage;
    }
}

/**
 * Validate input fields.
 *
 * @export
 * @param {object[]} [fieldValidations=[]] - Array of fieldValidations, each of which has
 *                      predicate, fieldName and errorMessage properties.
 * @returns
 */
export function validateFields(fieldValidations = []) {
    const errors = {};

    fieldValidations.forEach(item => {
        validateField(errors, item.predicate, item.fieldName, item.errorMessage);
    });

    const validationResult = {isValid: Object.keys(errors).length === 0, errors};
    return validationResult;
}

