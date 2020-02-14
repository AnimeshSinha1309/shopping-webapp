/* eslint-disable no-unused-vars */
const express = require("express"),
    router = express.Router(),
    bcrypt = require("bcryptjs"),
    jwt = require("jsonwebtoken"),
    keys = require("../config/keys"),
    // Load input validation
    validateRegisterInput = require("../validation/register"),
    validateLoginInput = require("../validation/login"),
    // Load User model
    { Customer, Vendor } = require("../models/User");

const ERROR_CODE = 400,
    NOT_FOUND_CODE = 404,
    SALT_ROUNDS = 10,
    ONE_YEAR_SECONDS = 86400 * 365;

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(ERROR_CODE).json(errors);
        return;
    }

    const isVendor = req.body.type === "vendor",
        model = isVendor ? Vendor : Customer;

    model.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(ERROR_CODE).json({ email: "Email already exists" });
            return;
        }

        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        if (!isVendor) { obj.orders = []; }

        // eslint-disable-next-line new-cap
        const newUser = new model(obj);

        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) { throw error; }

                newUser.password = hash;

                newUser.save().then(usr => res.json(usr)).catch(errorObj => console.log(errorObj));
            });
        });
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        res.status(ERROR_CODE).json(errors);
        return;
    }

    const { email, password } = req.body,
        isVendor = req.body.type === "vendor",
        model = isVendor ? Vendor : Customer;

    // Find user by email
    model.findOne({ email }).then((user) => {
        if (!user) {
            res.status(NOT_FOUND_CODE).json({ emailnotfound: "Email not found" });
            return;
        }

        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const jwtPayload = {
                    id: user.id,
                    name: user.name,
                };

                jwt.sign(
                    jwtPayload,
                    keys.secretOrKey,
                    {
                        expiresIn: ONE_YEAR_SECONDS,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                        });
                    },
                );
            } else {
                res.status(ERROR_CODE)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


module.exports = router;
