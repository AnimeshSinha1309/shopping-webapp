/* eslint-disable no-unused-vars */
function validateOrder(data) {
    const errors = {};


    return {
        errors, isValid: Object.keys(errors).length === 0,
    };
}

module.exports = { validateOrder };
