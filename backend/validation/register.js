const validator = require("validator"),
    config = require("../config/config");

function validateRegisterInput(data) {
    const errors = {},
        fields = {
            name: "Name", email: "Email", password: "Password", password2: "Confirm password", usertype: "User type",
        };

    // initialize to empty string if undefined
    for (const field of Object.keys(fields)) {
        if (!data[field]) {
            errors[field] = `${fields[field]} field is required`;
            if (field === "usertype") {
                errors[field] += " (vendor or customer)";
            }
            data[field] = "";
        } else if (field === "usertype" && data[field] !== "0" && data[field] !== "1") {
            errors.usertype = "User type must be either vendor or customer";
        }
    }

    if (!validator.isEmail(data.email)) {
        errors.email = `${fields.email} is invalid`;
    }

    const min = config.MIN_PASSWORD_LEN,
        max = config.MAX_PASSWORD_LEN;

    if (!validator.isLength(data.password, { min, max })) {
        errors.password = `${fields.password} length must be at least ${min} and at max ${max} characters`;
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Confirm password must match";
    }

    return {
        errors, isValid: Object.keys(errors).length === 0,
    };
}

module.exports = validateRegisterInput;
