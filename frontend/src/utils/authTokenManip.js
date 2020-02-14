import axios from "axios";

export function setAuthToken(token) {
    axios.defaults.headers.common.Authorization = token;
}

export function deleteAuthToken() {
    delete axios.defaults.headers.common.Authorization;
}
