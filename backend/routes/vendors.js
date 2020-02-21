/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),
    { validateProduct, validateDispatchProduct, validateCancelProduct } = require("../validation/product"),
    Product = require("../models/Product"),
    { Vendor } = require("../models/User"),
    { ProdRating, VendRating } = require("../models/Rating"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth"),
    { PRODUCT_STATUS_REV } = require("../config/config");

// create a new product by vendor
// eslint-disable-next-line no-unused-vars
const validatorFunc = checkValidationAndRedirect(validateProduct, (routerRes, data) => {
        data.quantityRem = data.quantity;
        data.status = PRODUCT_STATUS_REV.WAITING;
        data.image = {
            data: data.imageData,
            contentType: "image/png",
        };
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
            routerRes.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            return;
        }

        routerRes.json(res);
    });
}));


const cancelFunc = checkValidationAndRedirect(validateCancelProduct, (routerRes, data) => {
    Product.findByIdAndUpdate(data.productId, { status: 3 })
        .then(resp => routerRes.json(resp))
        .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
}, true);
router.post("/cancel-product", checkAuthAndRedirect(cancelFunc));

router.get("/review", (req, routerRes) => {
    VendRating
        .find({ vendor: req.query.vendor })
        .then((reviews) => {
            Vendor.findById(req.query.vendor).then((vend) => {
                routerRes.json({ reviews, vendid: vend.name });
            });
        });
});

router.get("/review-product", (req, routerRes) => {
    ProdRating
        .find({ product: req.query.product })
        .then((reviews) => {
            Product.findById(req.query.product).then((prod) => {
                routerRes.json({ reviews, prodid: prod.name });
            });
        });
});

module.exports = router;
