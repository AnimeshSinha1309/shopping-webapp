const Product = require("../models/Product"),
    { PRODUCT_STATUS_REV } = require("../config/config");

function validateProduct(data) {
    const errors = {};

    if (!data.name) {
        errors.name = "name cannot be left empty";
    }

    const values = {
        price: [1, 1e6],
        quantity: [0, 1e3],
    };

    for (const [value, [low, high]] of Object.entries(values)) {
        data[value] = Number.parseInt(data[value], 10);

        if (Number.isNaN(data[value])) {
            errors[value] = `${value} must be a number`;
        } else if (data[value] < low || data[value] > high) {
            errors[value] = `${value} must be in range ${low} to ${high}`;
        }
    }

    return {
        errors, isValid: Object.keys(errors).length === 0,
    };
}
function validteProductExists(data, callback) {
    const errors = {},
        { productId } = data;

    if (!productId) {
        errors.productId = "productId cannot be left empty";
        callback({
            errors, isValid: false,
        });
    } else {
        Product.findById(productId)
            .then((prod) => {
                callback({ prod, productId, isValid: true });
            })
            .catch(() => {
                errors.productId = `${productId} product doesn't exist`;
                callback({
                    errors, isValid: false,
                });
            });
    }
}
function validateDispatchProduct(data, callback) {
    validteProductExists(data, ({
        productId, prod, errors, isValid,
    }) => {
        if (!isValid) {
            callback({ errors, isValid });
        } else if (prod.quantityRem === 0 && prod.status === PRODUCT_STATUS_REV.PLACED) {
            callback({ isValid: true });
        } else {
            errors.productId = `${productId} product isn't finished placing orders yet, remaining ${prod.quantityRem} quantity`;
            callback({
                errors, isValid: false,
            });
        }
    });
}
function validateCancelProduct(data, callback) {
    validteProductExists(data, ({
        productId, prod, errors, isValid,
    }) => {
        if (!isValid) {
            callback({ errors, isValid });
        } else if (prod.quantityRem > 0 && prod.status === PRODUCT_STATUS_REV.WAITING) {
            callback({ isValid: true });
        } else {
            errors.productId = `${productId} product product has all orders placed, you cannot cancel it now`;
            callback({
                errors, isValid: false,
            });
        }
    });
}

module.exports = { validateProduct, validateDispatchProduct, validateCancelProduct };
