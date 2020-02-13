/* eslint-disable no-unused-vars */

/**
 * Notes:
 * 1. Everytime you add a new API route, do not forget to restart the server.
 * 2. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
 *  use this for mongoose
 * 3. mongodb doesn't support joins https://stackoverflow.com/q/19937524/
 */

// refer here http://expressjs.com/en/api.html
const express = require("express"),
    Order = require("../models/Order"),
    Product = require("../models/Product"),
    { Vendor } = require("../models/User"),
    router = express.Router();


router.get("/", (req, res, next) => {
    res.send("API is working properly");
});

// get list of products by a vendor
// req.params gets the :id things in the route url
// req.query gets the ?a=b things in the main url
router.get("/products", (req, res, next) => {
    const { productName } = req.query;

    Product.find({ name: new RegExp(productName) }, (error, products) => {
        if (error) {
            res.send(error);
        }

        res.json(products);
    });
});

// create a new product by vendor
router.post("/create", (req, res, next) => {
});

// search for products
router.get("/search", (req, res, next) => {
});

// get status of all my orders
router.get("/orders", (req, res, next) => {
    Order.find({}, () => {

    });
});

// get vendor list
router.get("/vendors", (req, res, next) => {
    Vendor.find({}, (error, vendors) => {
        if (error) {
            res.send(error);
        }

        res.json(vendors);
    });
});

module.exports = router;
