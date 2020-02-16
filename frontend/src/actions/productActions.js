import axios from "axios";
import HttpStatus from "http-status-codes";
import { endpoint, JWT_KEY } from "../config/settings";

const vendorEndpoint = `${endpoint}/vendors`;

function vendorPost(specificEndpoint, data) {
    return axios.post(`${vendorEndpoint}${specificEndpoint}`, data, { headers: { Authorization: localStorage[JWT_KEY] } });
}

function vendorGet(specificEndpoint, data) {
    return axios.get(`${vendorEndpoint}${specificEndpoint}`, { headers: { Authorization: localStorage[JWT_KEY] } });
}

export function createProduct(data, callback) {
    vendorPost("/create-product", data)
        .then(callback)
        .catch((err) => { console.log(err.response.data); });
}

export function getProductList(callback) {
    vendorGet("/product-list")
        .then((resp) => {
            callback(resp.data);
        })
        .catch(err => callback({ errors: err, code: HttpStatus.BAD_REQUEST }));
}
