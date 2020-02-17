// this is duplicated in backend

const PORT = "9000",
    endpoint = `http://localhost:${PORT}`,
    USER_KEY = "current_user",
    JWT_KEY = "jwtToken",
    USER_TYPE = {
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
for (const key of Object.keys(PRODUCT_STATUS)) { PRODUCT_STATUS_REV[PRODUCT_STATUS[key]] = Number(key); }

export {
    PORT, USER_KEY, USER_TYPE, USER_TYPE_REV, endpoint, JWT_KEY, PRODUCT_STATUS_REV, PRODUCT_STATUS,
};
