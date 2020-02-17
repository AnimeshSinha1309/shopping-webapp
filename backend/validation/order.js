const Product = require("../models/Product"),
    Order = require("../models/Order"),
    { Customer } = require("../models/User");

/* eslint-disable no-unused-vars */
function validateOrder(data, callback) {
    const errors = {},
        fields = [
            "product", "customer", "count",
        ];

    // initialize to empty string if undefined
    for (const field of fields) {
        if (!data[field]) {
            errors[field] = `${fields[field]} field is required`;
            data[field] = "";

            callback({
                errors, isValid: Object.keys(errors).length === 0,
            });
            return;
        }
    }

    // same product id should not exist
    Order.find({ product: data.product, customer: data.customer }).then((order) => {
        if (order.length > 0) {
            errors.order = "Cannot order same product twice";
            callback({
                errors, isValid: Object.keys(errors).length === 0,
            });
        } else {
            // quantity should be in range
            Product.findById(data.product).then((prod) => {
                if (data.count < 1 || data.count > prod.quantityRem) {
                    errors.count = `Order count be in range 1 to ${prod.quantityRem}`;

                    callback({
                        errors, isValid: Object.keys(errors).length === 0,
                    });
                } else {
                    Customer.findById(data.customer).then((cust) => {
                        if (!cust) {
                            errors.customer = `Supplied customer id ${data.customer} does not exist`;

                            callback({
                                errors, isValid: Object.keys(errors).length === 0,
                            });
                        } else {
                            callback({ isValid: true });
                        }
                    });
                }
            });
        }
    });
}

module.exports = { validateOrder };
