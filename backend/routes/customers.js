/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),

    { validateOrder, validateOrderEdit } = require("../validation/order"),
    { Vendor } = require("../models/User"),
    Product = require("../models/Product"),
    Order = require("../models/Order"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth"),
    { PRODUCT_STATUS, PRODUCT_STATUS_REV } = require("../config/config");

// create a new order by customer
const validatorFunc = checkValidationAndRedirect(validateOrder, (routerRes, data) => {
        const order = new Order(data),
            remCount = data.quantityRem - data.count,
            updateObj = remCount ? { quantityRem: remCount } : { quantityRem: remCount, status: 1 };

        Product.findByIdAndUpdate(data.product, updateObj).then(() => {
            order.save()
                .then((response) => {
                    routerRes.json(response);
                })
                .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
        });
    }, true),
    createOrderFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-order", createOrderFunc);


router.post("/search", checkAuthAndRedirect((req, res) => {
    function productListHandler(products) {
        products = products.filter(x => x.status === PRODUCT_STATUS_REV.WAITING);
        const resProds = [];
        let target = products.length;

        if (products.length === 0) {
            res.json(resProds);
            return;
        }

        products.forEach((x) => {
            Vendor.findById(x.vendor, (err, vend) => {
                x.vendor = vend.name;

                Order.find({ customer: req.body.customer, product: x.id }, (err2, orders) => {
                    if (orders.length > 0) {
                        target--;
                    } else {
                        resProds.push(x);
                    }

                    if (resProds.length === target) { res.json(resProds); }
                });
            });
        });
    }

    const { productName } = req.body;

    if (productName === "") {
        Product.find({}).then(productListHandler);
    } else {
        Product.fuzzySearch(productName).then(productListHandler);
    }
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

                Product.findById(productID)
                    .then((product) => {
                        order._doc.status = PRODUCT_STATUS[product.status];
                        order._doc.quantityRem = product.quantityRem;
                        order._doc.price = product.price;

                        if (product.image && product.image.data) {
                            order._doc.image = { data: product.image.data };
                        }

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
                    })
                    .catch((err) => {
                        res.status(HttpStatus.BAD_REQUEST).json({ ...err, notfound: productID });
                    });
            });
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
}));

const editOrder = checkValidationAndRedirect(validateOrderEdit, (routerRes, data) => {
    Order.findById(data.orderId)
        .then((order) => {
            const delta = -Number(data.newQuantity) + order.count;

            order.update({ count: Number(data.newQuantity) })
                .then(() => {
                    Product.findById(order.product)
                        .then((prod) => {
                            const remCount = prod.quantityRem + delta,
                                updateObj = remCount ? { quantityRem: remCount } : { quantityRem: remCount, status: 1 };
                            prod.update(updateObj)
                                .then(() => routerRes.json({}));
                        });
                });
        });
}, true);

router.post("/edit-order", checkAuthAndRedirect(editOrder));

module.exports = router;
