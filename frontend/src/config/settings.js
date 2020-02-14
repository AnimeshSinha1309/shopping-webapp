// this is duplicated in backend

const PORT = "9000",
    USER_KEY = "current_user",
    USER_TYPE = {
        vendor: 0, customer: 1,
    },
    USER_TYPE_REV = { };

for (const key of Object.keys(USER_TYPE)) { USER_TYPE_REV[USER_TYPE[key]] = key; }


export {
    PORT, USER_KEY, USER_TYPE, USER_TYPE_REV,
};
