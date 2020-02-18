const Product = require("../models/Product"),
    Order = require("../models/Order"),
    { Customer } = require("../models/User"),
    { genErrors } = require("../utils/errors");

/* eslint-disable no-unused-vars */
function validateOrder(orderReq, callback) {
    const errors = [],
        fields = [
            "product", "customer", "count",
        ];

    // initialize to empty string if undefined
    for (const field of fields) {
        if (!orderReq[field]) {
            orderReq[field] = "";

            callback(genErrors(`${fields[field]} field is required`));
            return;
        }
    }

    // same product id should not exist
    Order.find({ product: orderReq.product, customer: orderReq.customer }).then((order) => {
        if (order.length > 0) {
            callback(genErrors("Cannot order same product twice"));
        } else {
            // quantity should be in range
            Product.findById(orderReq.product).then((prod) => {
                if (orderReq.count < 1 || orderReq.count > prod.quantityRem) {
                    callback(genErrors(`Order count be in range 1 to ${prod.quantityRem}`));
                } else {
                    Customer.findById(orderReq.customer).then((cust) => {
                        if (!cust) {
                            callback(genErrors(`Supplied customer id ${orderReq.customer} does not exist`));
                        } else {
                            // set this, useful for the callback
                            orderReq.quantityRem = prod.quantityRem;
                            callback({});
                        }
                    });
                }
            });
        }
    });
}

module.exports = { validateOrder };
