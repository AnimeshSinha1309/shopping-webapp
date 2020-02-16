/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),
    { validateProduct } = require("../validation/product"),
    Product = require("../models/Product"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth"),
    { extractFields } = require("../utils/helper");

// create a new product by vendor
// eslint-disable-next-line no-unused-vars
const validatorFunc = checkValidationAndRedirect(validateProduct, (routerRes, data) => {
        const prod = new Product(data);

        prod.save()
            .then((response) => {
                routerRes.json(response);
            })
            .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
    }),
    createProdFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-product", createProdFunc);

router.get("/product-list", checkAuthAndRedirect((req, routerRes, jwtResult) => {
    const prod = [],
        // each elm in prod array should be name, price, qty and qty remaining
        { id: vendorId } = jwtResult;

    Product.find({ vendor: vendorId }, (err, res) => {
        if (err) {
            routerRes.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            return;
        }

        routerRes.json(res.map(extractFields));
    });
}));

module.exports = router;
