import { USER_KEY } from "../config/settings";

function getCurrentUserObj() {
    const lsObject = localStorage[USER_KEY] && JSON.parse(localStorage[USER_KEY]),
        isLoggedIn = lsObject && lsObject.name && lsObject.name.length > 0;

    return isLoggedIn ? lsObject : null;
}

function getLoggedInUserName() {
    const lsObject = getCurrentUserObj();

    return lsObject ? lsObject.name : "";
}

export { getLoggedInUserName, getCurrentUserObj };
