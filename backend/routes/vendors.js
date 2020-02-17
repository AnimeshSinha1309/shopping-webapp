/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),
    { validateProduct, validateDispatchProduct } = require("../validation/product"),
    Product = require("../models/Product"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth"),
    { PRODUCT_STATUS_REV } = require("../config/config");

// create a new product by vendor
// eslint-disable-next-line no-unused-vars
const validatorFunc = checkValidationAndRedirect(validateProduct, (routerRes, data) => {
        data.status = 0; // initialize product state to 0
        const prod = new Product(data);

        prod.save()
            .then((response) => {
                routerRes.json(response);
            })
            .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
    }),
    createProdFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-product", createProdFunc);


const dispatcher = checkValidationAndRedirect(validateDispatchProduct, (routerRes, data) => {
    const { productId } = data;

    Product
        .findByIdAndUpdate(productId, { status: PRODUCT_STATUS_REV.DISPATCHED })
        .then(() => routerRes.json({}))
        .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
}, true);
router.post("/dispatch-product", checkAuthAndRedirect(dispatcher));

router.get("/product-list", checkAuthAndRedirect((req, routerRes, jwtResult) => {
    const { id: vendorId } = jwtResult;

    Product.find({ vendor: vendorId }, (err, res) => {
        if (err) {
            // TODO: refactor this statement out
            routerRes.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            return;
        }

        routerRes.json(res);
    });
}));

module.exports = router;
