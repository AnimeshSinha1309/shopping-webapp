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

export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post("/api/users/register", userData)
        // this history object is from react-router
        // re-direct to login on successful register
        .then(() => history.push("/login"))
        // TODO: what's this dispatch?!
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const loginUser = userData => (dispatch) => {
    axios
        .post("/api/users/login", userData)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const setUserLoading = () => ({
    type: USER_LOADING,
});

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("jwtToken");

    deleteAuthToken();

    dispatch(setCurrentUser({}));
};
