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

module.exports = router;
