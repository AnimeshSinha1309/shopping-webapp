const Product = require("../models/Product"),
    Order = require("../models/Order"),
    { Customer } = require("../models/User");

/* eslint-disable no-unused-vars */
function validateOrder(orderReq, callback) {
    const errors = {},
        fields = [
            "product", "customer", "count",
        ];

    // initialize to empty string if undefined
    for (const field of fields) {
        if (!orderReq[field]) {
            errors[field] = `${fields[field]} field is required`;
            orderReq[field] = "";

            callback({
                errors, isValid: Object.keys(errors).length === 0,
            });
            return;
        }
    }

    // same product id should not exist
    Order.find({ product: orderReq.product, customer: orderReq.customer }).then((order) => {
        if (order.length > 0) {
            errors.order = "Cannot order same product twice";
            callback({
                errors, isValid: Object.keys(errors).length === 0,
            });
        } else {
            // quantity should be in range
            Product.findById(orderReq.product).then((prod) => {
                if (orderReq.count < 1 || orderReq.count > prod.quantityRem) {
                    errors.count = `Order count be in range 1 to ${prod.quantityRem}`;

                    callback({
                        errors, isValid: Object.keys(errors).length === 0,
                    });
                } else {
                    Customer.findById(orderReq.customer).then((cust) => {
                        if (!cust) {
                            errors.customer = `Supplied customer id ${orderReq.customer} does not exist`;

                            callback({
                                errors, isValid: Object.keys(errors).length === 0,
                            });
                        } else {
                            // set this, useful for the callback
                            orderReq.quantityRem = prod.quantityRem;
                            callback({ isValid: true });
                        }
                    });
                }
            });
        }
    });
}

module.exports = { validateOrder };
