const validator = require("validator");

function validateLoginInput(data) {
    const errors = {},
        fields = {
            email: "Email", password: "Password",
        };

    // initialize to empty string if undefined
    for (const field of Object.keys(fields)) {
        if (!data[field]) {
            errors[field] = `${fields[field]} field is required`;
            data[field] = "";
        }
    }

    if (!validator.isEmail(data.email)) {
        errors.email = `${fields.email} is invalid`;
    }

    return {
        errors, isValid: Object.keys(errors).length === 0,
    };
}

module.exports = validateLoginInput;
