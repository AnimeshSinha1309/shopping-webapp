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
        const prod = new Order(data);

        prod.save()
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

module.exports = router;
