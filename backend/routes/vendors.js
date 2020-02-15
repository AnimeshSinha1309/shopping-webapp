/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    HttpStatus = require("http-status-codes"),
    keys = require("../config/keys"),
    { validateProduct } = require("../validation/product"),
    Product = require("../models/Product");

// create a new product by vendor
// eslint-disable-next-line no-unused-vars
router.post("/create-product", (req, res, next) => {
    const data = req.body,
        validation = validateProduct(data);

    if (!validation.isValid) { res.status(HttpStatus.BAD_REQUEST).json(validation.errors); }

    const prod = new Product(data);

    prod.save()
        .then(response => res.json(response))
        .catch(err => res.json(HttpStatus.BAD_REQUEST).send(err));
});

router.get("/product-list", (req, res, next) => {
    let prod = [],
        // each element in prod array should be an object
        // of name, status, quantity, quantity-remaining
        token = req.headers.authorization;

    // TODO: refactor this
    if (!token) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing authorization" });
        return;
    }

    // need to split out the Bearer part
    [, token] = token.split(" ");

    jwt.verify(token, keys.secretOrKey, (err, result) => {
        if (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: err });
            return;
        }

        const { vendorId } = result;

        Product.find({});
    });
});

module.exports = router;
