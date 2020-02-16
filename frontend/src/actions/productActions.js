import HttpStatus from "http-status-codes";
import { endpoint } from "../config/settings";
import { postData, getData } from "./generalGetSet";

const vendorEndpoint = `${endpoint}/vendors`;

export function createProduct(data, callback) {
    postData(`${vendorEndpoint}/create-product`, data)
        .then(callback)
        .catch((err) => { console.log(err.response.data); });
}

export function getProductList(callback) {
    getData(`${vendorEndpoint}/product-list`)
        .then((resp) => {
            callback(resp.data);
        })
        .catch(err => callback({ errors: err, code: HttpStatus.BAD_REQUEST }));
}
