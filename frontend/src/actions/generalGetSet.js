import axios from "axios";
import { JWT_KEY } from "../config/settings";

function postData(endpoint, data) {
    return axios.post(`${endpoint}`, data, { headers: { Authorization: localStorage[JWT_KEY] } });
}

function getData(endpoint, params = {}) {
    return axios.get(`${endpoint}`, { headers: { Authorization: localStorage[JWT_KEY] }, params });
}

export { getData, postData };
