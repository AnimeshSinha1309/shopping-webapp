const validator = require("validator"),
    config = require("../config/config");

function validateRegisterInput(data) {
    const errors = [],
        fields = {
            name: "Name", email: "Email", password: "Password", password2: "Confirm password", usertype: "User type",
        };

    // initialize to empty string if undefined
    for (const field of Object.keys(fields)) {
        if (!data[field]) {
            let err = `${fields[field]} is required`;
            if (field === "usertype") {
                err += " (vendor or customer)";
            }
            errors.push(err);
            data[field] = "";
        } else if (field === "usertype" && data[field] !== "0" && data[field] !== "1") {
            errors.push("User type must be either vendor or customer");
        }
    }

    if (!validator.isEmail(data.email)) {
        errors.push(`${fields.email} is invalid`);
    }

    const min = config.MIN_PASSWORD_LEN,
        max = config.MAX_PASSWORD_LEN;

    if (!validator.isLength(data.password, { min, max })) {
        errors.push(`${fields.password} length must be at least ${min} and at max ${max} characters`);
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.push("Confirm password must match");
    }

    return { errors };
}

module.exports = validateRegisterInput;
