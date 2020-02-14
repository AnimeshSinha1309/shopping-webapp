// axios is just for performing post/get http requests
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { setAuthToken, deleteAuthToken } from "../utils/authTokenManip";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "./types";

export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded,
});

const endpoint = "http://localhost:9000/users";

export const registerUser = (userData, history, callback) => {
    axios
        .post(`${endpoint}/register`, userData)
        // this history object is from react-router
        // re-direct to login on successful register
        .then(() => history.push("/login"))
        .catch(err => (callback ? callback({
            type: GET_ERRORS,
            payload: err.response.data,
        }) : console.log(err)));
};

export function loginUser(userData, callback) {
    axios
        .post(`${endpoint}/login`, userData)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            callback(setCurrentUser(decoded));
        })
        .catch(err => (callback ? callback({
            type: GET_ERRORS,
            payload: err.response.data,
        }) : console.log(err)));
}

export function setUserLoading(callback) {
    callback({
        type: USER_LOADING,
    });
}

export function logoutUser(callback) {
    localStorage.removeItem("jwtToken");

    deleteAuthToken();

    callback(setCurrentUser({}));
}
