const Product = require("../models/Product"),
    { PRODUCT_STATUS_REV } = require("../config/config"),
    { genErrors, isValid } = require("../utils/errors");

function validateProduct(data) {
    const errors = [];

    if (!data.name) {
        errors.push("Name cannot be left empty");
    }

    const values = {
        price: [1, 1e6],
        quantity: [0, 1e3],
    };

    for (const [value, [low, high]] of Object.entries(values)) {
        data[value] = Number.parseInt(data[value], 10);

        if (Number.isNaN(data[value])) {
            errors.push(`${value} must be a number`);
        } else if (data[value] < low || data[value] > high) {
            errors.push(`${value} must be in range ${low} to ${high}`);
        }
    }

    return { errors };
}
function validteProductExists(data, callback) {
    const { productId } = data;

    if (!productId) {
        callback(genErrors("productId cannot be left empty"));
    } else {
        Product.findById(productId)
            .then((prod) => {
                callback({ prod, productId });
            })
            .catch(() => {
                callback(genErrors(`${productId} product doesn't exist`));
            });
    }
}
function validateDispatchProduct(data, callback) {
    validteProductExists(data, (obj) => {
        if (!isValid(obj)) {
            callback({ errors: obj.errors });
        } else if (obj.prod.quantityRem === 0 && obj.prod.status === PRODUCT_STATUS_REV.PLACED) {
            callback({});
        } else {
            callback(genErrors(`${obj.productId} product isn't finished placing orders yet, remaining ${obj.prod.quantityRem} quantity`));
        }
    });
}
function validateCancelProduct(data, callback) {
    validteProductExists(data, (obj) => {
        if (!isValid(obj)) {
            callback({ errors: obj.errors });
        } else if (obj.prod.quantityRem > 0 && obj.prod.status === PRODUCT_STATUS_REV.WAITING) {
            callback();
        } else {
            callback(genErrors(`${obj.productId} product product has all orders placed, you cannot cancel it now`));
        }
    });
}

module.exports = { validateProduct, validateDispatchProduct, validateCancelProduct };
