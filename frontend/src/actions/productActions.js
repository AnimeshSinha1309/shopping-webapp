import HttpStatus from "http-status-codes";
import { endpoint } from "../config/settings";
import { postData, getData } from "./generalGetSet";
import { extractFields } from "../utils/helper";

const vendorEndpoint = `${endpoint}/vendors`;

export function createProduct(data, callback) {
    postData(`${vendorEndpoint}/create-product`, data)
        .then(callback)
        .catch((err) => { console.log(err.response.data); });
}

export function getProductList(prodType, callback) {
    getData(`${vendorEndpoint}/product-list`)
        .then((resp) => {
            // these fields should not render in the final list
            const blackList = ["status", "vendor"];
            let prods = resp.data.filter(x => x.status === prodType);

            prods = prods.map(x => extractFields(x, blackList));
            callback(prods);
        })
        .catch(err => callback({ errors: err, code: HttpStatus.BAD_REQUEST }));
}
