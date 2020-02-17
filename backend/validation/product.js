const Product = require("../models/Product");

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

function validateDispatchProduct(data, callback) {
    const errors = {},
        { productId } = data;

    if (!productId) {
        errors.productId = "productId cannot be left empty";
        callback({
            errors, isValid: Object.keys(errors).length === 0,
        });
    } else {
        Product.findById(productId)
            .then((prod) => {
                if (prod.quantityRem === 0) {
                    callback({ isValid: true });
                } else {
                    errors.productId = `${productId} product isn't finished placing orders yet, remaining ${prod.quantityRem} quantity`;
                    callback({
                        errors, isValid: Object.keys(errors).length === 0,
                    });
                }
            })
            .catch(() => {
                errors.productId = `${productId} product doesn't exist`;
                callback({
                    errors, isValid: Object.keys(errors).length === 0,
                });
            });
    }
}

module.exports = { validateProduct, validateDispatchProduct };
