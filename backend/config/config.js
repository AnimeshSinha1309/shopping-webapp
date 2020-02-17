const USER_TYPE = {
        vendor: "0", customer: "1",
    },
    USER_TYPE_REV = { },
    PRODUCT_STATUS = {
        0: "Waiting",
        1: "Placed",
        2: "Dispatched",
        3: "Cancelled",
    },
    PRODUCT_STATUS_REV = {
    };

for (const key of Object.keys(USER_TYPE)) { USER_TYPE_REV[USER_TYPE[key]] = key; }
for (const key of Object.keys(PRODUCT_STATUS)) { PRODUCT_STATUS_REV[PRODUCT_STATUS[key]] = key; }

module.exports = {
    MIN_PASSWORD_LEN: 6,
    MAX_PASSWORD_LEN: 30,
    PORT: "9000",
    USER_KEY: "current_user",
    USER_TYPE,
    USER_TYPE_REV,
    PRODUCT_STATUS,
    PRODUCT_STATUS_REV,
};
