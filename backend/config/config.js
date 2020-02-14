const USER_TYPE = {
        vendor: 0, customer: 1,
    },
    USER_TYPE_REV = { };

for (const key of Object.keys(USER_TYPE)) { USER_TYPE_REV[USER_TYPE[key]] = key; }

module.exports = {
    MIN_PASSWORD_LEN: 6,
    MAX_PASSWORD_LEN: 30,
    PORT: "9001",
    USER_KEY: "current_user",
    USER_TYPE,
    USER_TYPE_REV,
};
