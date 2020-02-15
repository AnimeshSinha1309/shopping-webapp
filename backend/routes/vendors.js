const express = require("express"),
    router = express.Router();

// create a new product by vendor
// eslint-disable-next-line no-unused-vars
router.post("/create-product", (req, res, next) => {
    console.log(req.body);
});

module.exports = router;
