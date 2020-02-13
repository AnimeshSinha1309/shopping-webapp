// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// use this for mongoose
/* eslint-disable no-unused-vars */

// refer here http://expressjs.com/en/api.html

const express = require("express"),
    router = express.Router();

router.get("/", (req, res, next) => {
    res.send("API is working properly");
});

// get list of products by a vendor
router.get("/products", (req, res, next) => {
    const { vendor } = req.params;

    // query mongodb backend
});

// create a new product by vendor
router.post("/create", (req, res, next) => {
});

// search for products
router.get("/search", (req, res, next) => {
});

// get status of product
router.get("/status", (req, res, next) => {
});

module.exports = router;
