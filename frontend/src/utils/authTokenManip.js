import axios from "axios";

// this doens't work because https://stackoverflow.com/questions/44245588
export function setAuthToken(token) {
    axios.defaults.headers.common.Authorization = token;
}

export function deleteAuthToken() {
    delete axios.defaults.headers.common.Authorization;
}
