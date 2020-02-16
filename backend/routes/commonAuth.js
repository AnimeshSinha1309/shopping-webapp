
const jwt = require("jsonwebtoken"),
    HttpStatus = require("http-status-codes"),
    keys = require("../config/keys");
/**
 *
 * @param {Function} validator takes data as argument and returns validation
 * @param {Function} func takes valid data and routerRes as argument
 */
function checkValidationAndRedirect(validator, func) {
    return function (req, res) {
        const data = req.body,
            validation = validator(data);

        if (!validation.isValid) { res.status(HttpStatus.BAD_REQUEST).json({ error: validation.errors }); return; }

        func(res, data);
    };
}

function checkAuthAndRedirect(func) {
    return function (req, res) {
        let token = req.headers.authorization;

        // TODO: refactor this
        if (!token) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing authorization" });
            return;
        }

        // need to split out the Bearer part
        [, token] = token.split(" ");

        jwt.verify(token, keys.secretOrKey, (err, result) => {
            if (err) {
                console.log(err);
                res.status(HttpStatus.BAD_REQUEST).json({ error: err });
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
