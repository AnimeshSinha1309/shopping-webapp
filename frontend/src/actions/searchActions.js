import { postData } from "./generalGetSet";
import { endpoint } from "../config/settings";

const custEndpoint = `${endpoint}/customers`;

export function searchProduct(productName, callback) {
    postData(`${custEndpoint}/search`, { productName }).then(x => callback(x.data));
}
