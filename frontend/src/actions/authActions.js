// axios is just for performing post/get http requests
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { USER_KEY, endpoint, JWT_KEY } from "../config/settings";
import { errorCatcher } from "../utils/helper";

const userEndpoint = `${endpoint}/users`;

function setCurrentUser(decoded) {
    localStorage[USER_KEY] = JSON.stringify(decoded);
}

export function registerUser(userData, callback) {
    axios
        .post(`${userEndpoint}/register`, userData)
        .then(callback)
        .catch(errorCatcher(callback));
}

export function loginUser(userData, callback) {
    axios
        .post(`${userEndpoint}/login`, userData)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem(JWT_KEY, token);

            const decoded = jwt_decode(token);
            setCurrentUser(decoded);
            callback();
        })
        .catch(errorCatcher(callback));
}


export function logoutUser(callback) {
    localStorage.removeItem(JWT_KEY);

    setCurrentUser({});
    if (callback) { callback(); }
}
