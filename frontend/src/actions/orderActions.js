import { postData } from "./generalGetSet";
import { endpoint } from "../config/settings";

const custEndpoint = `${endpoint}/customers`;

export function searchProduct(productName, callback) {
    postData(`${custEndpoint}/search`, { productName }).then(x => callback(x.data));
}

export function orderProduct(productID, quantity, callback) {
    postData(`${custEndpoint}/create-order`, { product: productID, count: quantity })
        .then(x => callback(x.data))
        .catch((...args) => console.log(args));
}
