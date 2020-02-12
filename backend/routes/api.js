// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// use this for mongoose

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

// get list of products by a vendor
router.get("/products", function(req, res, next) {
    res.send("---");
});

// create a new product by vendor
router.post("/create", function(req, res, next) {
});

// search for products
router.get("/search", function(req, res, next) {
});

// get status of product
router.get("/status", function(req, res, next) {
});

module.exports = router;