/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),

    { validateOrder } = require("../validation/order"),
    { Vendor } = require("../models/User"),
    Product = require("../models/Product"),
    Order = require("../models/Order"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth");

// create a new order by customer
const validatorFunc = checkValidationAndRedirect(validateOrder, (routerRes, data) => {
        const order = new Order(data);

        order.save()
            .then((response) => {
                routerRes.json(response);
            })
            .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
    }),
    createOrderFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-order", createOrderFunc);

router.post("/search", checkAuthAndRedirect((req, res) => {
    const { productName } = req.body;

    Product.find({ name: new RegExp(productName), status: 0 }).then((products) => {
        let c = 0;

        const resProds = [];
        products.forEach((x) => {
            Vendor.findById(x.vendor, (err, vend) => {
                x.vendor = vend.name;
                resProds.push(x);
                c++;

                if (c === products.length) { res.status(200).json(resProds); }
            });
        });
    });
}));

router.get("/view-orders", checkAuthAndRedirect((req, res) => {
    Order
        .find({ customer: req.body.customer })
        .then((orders) => {
            const resOrders = [];

            orders.forEach((order) => {
                const { product: productID } = order;

                Product.findById(productID).then((product) => {
                    order._doc.status = product.status;
                    order._doc.quantityRem = product.quantityRem;

                    order.product = product.name;
                    order.customer = undefined;
                    const { vendor: vendorID } = product;

                    Vendor.findById(vendorID).then((vend) => {
                        order._doc.vendor = vend.name;

                        resOrders.push(order);

                        if (resOrders.length === orders.length) {
                            res.status(HttpStatus.OK).json(resOrders);
                        }
                    });
                });
            });
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
}));

module.exports = router;
