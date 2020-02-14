import { USER_KEY } from "../config/settings";

function getLoggedInUser() {
    const lsObject = localStorage[USER_KEY] && JSON.parse(localStorage[USER_KEY]),
        isLoggedIn = lsObject && lsObject.name && lsObject.name.length > 0;

    return isLoggedIn ? lsObject.name : "";
}

export { getLoggedInUser };
