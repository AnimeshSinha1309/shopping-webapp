import { getData, postData } from "./generalGetSet";
import { endpoint } from "../config/settings";
import { errorCatcher } from "../utils/helper";

const custEndpoint = `${endpoint}/customers`;

export function searchProduct(productName, callback) {
    postData(`${custEndpoint}/search`, { productName })
        .then(x => callback(x.data))
        .catch(errorCatcher(callback));
}

export function orderProduct(productID, quantity, callback) {
    postData(`${custEndpoint}/create-order`, { product: productID, count: quantity })
        .then(({ data }) => { callback(data); })
        .catch(errorCatcher(callback));
}

export function getOrders(callback) {
    getData(`${custEndpoint}/view-orders`)
        .then(({ data }) => callback(data))
        .catch(errorCatcher(callback));
}

export function editOrder(orderId, newQuantity, callback) {
    postData(`${custEndpoint}/edit-order`, { orderId, newQuantity })
        .then(({ data }) => { callback(data); })
        .catch(errorCatcher(callback));
}
export function reviewVendor(vendorId, rating, review, callback) {
    postData(`${custEndpoint}/rate-vendor`, { vendorId, rating, review })
        .then(({ data }) => { callback(data); })
        .catch(errorCatcher(callback));
}

export function reviewProduct(productId, rating, review, callback) {
    postData(`${custEndpoint}/review-product`, { productId, rating, review })
        .then(({ data }) => { callback(data); })
        .catch(errorCatcher(callback));
}
