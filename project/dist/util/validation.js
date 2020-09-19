export function isValidInput(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minStringLength;
    }
    if (validatableInput.maxStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxStringLength;
    }
    if (validatableInput.minNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.minNumberLength;
    }
    if (validatableInput.maxNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.maxNumberLength;
    }
    return isValid;
}
