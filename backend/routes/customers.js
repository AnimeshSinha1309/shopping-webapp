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
    }, true),
    createOrderFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-order", createOrderFunc);

router.post("/search", checkAuthAndRedirect((req, res) => {
    const { productName } = req.body;

    Product.find({ name: new RegExp(productName), status: 0 }).then((products) => {
        const resProds = [];

        if (products.length === 0) {
            res.json(resProds);
            return;
        }

        products.forEach((x) => {
            Vendor.findById(x.vendor, (err, vend) => {
                x.vendor = vend.name;
                resProds.push(x);

                if (resProds.length === products.length) { res.json(resProds); }
            });
        });
    });
}));

router.get("/view-orders", checkAuthAndRedirect((req, res) => {
    Order
        .find({ customer: req.body.customer })
        .then((orders) => {
            const resOrders = [];

            if (orders.length === 0) {
                res.status(HttpStatus.OK).json(resOrders); return;
            }

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
