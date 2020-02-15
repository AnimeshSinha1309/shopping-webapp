// axios is just for performing post/get http requests
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { setAuthToken, deleteAuthToken } from "../utils/authTokenManip";
import {
    GET_ERRORS,
    USER_LOADING,
} from "./types";
import { USER_KEY, endpoint } from "../config/settings";

const userEndpoint = `${endpoint}/users`;

function setCurrentUser(decoded) {
    localStorage[USER_KEY] = JSON.stringify(decoded);
}

export const registerUser = (userData, callback) => {
    axios
        .post(`${userEndpoint}/register`, userData)
        .then(callback)
        .catch(err => (callback ? callback({
            type: GET_ERRORS,
            payload: err.response.data,
        }) : undefined));
};

export function loginUser(userData, history, callback) {
    axios
        .post(`${userEndpoint}/login`, userData)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            setCurrentUser(decoded);
            callback();
        })
        .catch((err) => {
            console.log(err);
            return callback ? callback({
                type: GET_ERRORS,
                payload: err.response.data,
            }) : undefined;
        });
}

export function setUserLoading(callback) {
    callback({
        type: USER_LOADING,
    });
}

export function logoutUser(callback) {
    localStorage.removeItem("jwtToken");

    deleteAuthToken();

    setCurrentUser({});
    if (callback) { callback(); }
}
