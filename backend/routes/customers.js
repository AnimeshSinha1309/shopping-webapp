/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    HttpStatus = require("http-status-codes"),
    { validateOrder } = require("../validation/order"),
    { Order } = require("../models/Order"),
    { checkAuthAndRedirect, checkValidationAndRedirect } = require("../routes/commonAuth");

// create a new order by customer
const validatorFunc = checkValidationAndRedirect(validateOrder, (routerRes, data) => {
        const prod = new Order(data);

        prod.save()
            .then((response) => {
                routerRes.json(response);
            })
            .catch(err => routerRes.status(HttpStatus.BAD_REQUEST).send(err));
    }),
    createOrderFunc = checkAuthAndRedirect(validatorFunc);

router.post("/create-order", createOrderFunc);

router.get("/search", checkAuthAndRedirect(() => {

}));

module.exports = router;
