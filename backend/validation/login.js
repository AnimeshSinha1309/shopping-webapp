const validator = require("validator");

function validateLoginInput(data) {
    const errors = [];

    if (!data.password) {
        errors.push("Password is required");
        data.password = "";
    }

    if (!validator.isEmail(data.email)) {
        errors.push("Email is invalid");
    }

    return { errors };
}

module.exports = validateLoginInput;
