function isValid(object) {
    // check for undefined, empty array, empty object
    return !object.errors || object.errors.length === 0 || Object.keys(object.errors) === 0;
}

function genErrors(...errorList) {
    return { errors: errorList };
}

module.exports = { genErrors, isValid };
