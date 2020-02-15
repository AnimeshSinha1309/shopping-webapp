import axios from "axios";
import HttpStatus from "http-status-codes";
import { endpoint } from "../config/settings";

const vendorEndpoint = `${endpoint}/vendors`;

export function createProduct(data, callback) {
    axios.post(`${vendorEndpoint}/create-product`, data)
        .then(callback)
        .catch(err => callback({ errors: err, code: HttpStatus.BAD_REQUEST }));
}

export function getProductList(callback) {
    axios
        .get(`${vendorEndpoint}/product-list`)
        .then(callback)
        .catch(err => callback({ errors: err, code: HttpStatus.BAD_REQUEST }));
}
