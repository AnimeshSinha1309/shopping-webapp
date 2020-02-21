
const jwt = require("jsonwebtoken"),
    HttpStatus = require("http-status-codes"),
    keys = require("../config/keys"),
    { isValid, genErrors } = require("../utils/errors");
/**
 *
 * @param {Function} validator takes data as argument and returns validation
 * @param {Function} func takes valid data and routerRes as argument
 */
function checkValidationAndRedirect(validator, func, cbType = false) {
    return function (req, res) {
        const data = req.body;
        if (!cbType) {
            const validation = validator(data);

            if (!isValid(validation)) { res.status(HttpStatus.BAD_REQUEST).json(validation); return; }

            func(res, data);
        } else {
            validator(data, (result) => {
                if (isValid(result)) {
                    func(res, data);
                } else {
                    res.status(HttpStatus.BAD_REQUEST).json(result);
                }
            });
        }
    };
}

function checkAuthAndRedirect(func) {
    return function (req, res) {
        let token = req.headers.authorization;

        if (!token) {
            res.status(HttpStatus.BAD_REQUEST).json(genErrors("Missing authorization"));
            return;
        }

        // need to split out the Bearer part
        [, token] = token.split(" ");

        jwt.verify(token, keys.secretOrKey, (err, result) => {
            if (err) {
                console.log(err);
                res.status(HttpStatus.BAD_REQUEST).json(genErrors(err));
                return;
            }

            // in post requests, also add the received id into the request body
            if (req.body) {
                // set both, can use whatever they need
                req.body.vendor = result.id;
                req.body.customer = result.id;
            }

            func(req, res, result);
        });
    };
}


module.exports = { checkAuthAndRedirect, checkValidationAndRedirect };
