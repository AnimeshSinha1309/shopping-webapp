export function isValid(object) {
    // check for undefined, empty array, empty object
    return !object || !object.errors || object.errors.length === 0 || Object.keys(object.errors) === 0;
}

export function genErrors(...errorList) {
    return { errors: errorList };
}
