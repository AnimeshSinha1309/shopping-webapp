const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),
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

module.exports = router;
