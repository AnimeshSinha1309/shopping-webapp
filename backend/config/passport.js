const JwtStrategy = require("passport-jwt").Strategy,
    { ExtractJwt } = require("passport-jwt");
const { Customer } = require("../models/User"),
    keys = require("../config/keys"),
    opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secretOrKey,
    };

function something(passport) {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            Customer.findById(jwtPayload.id)
                .then((user) => {
                    if (user) { return done(null, user); }

                    return done(null, false);
                })
                .catch(err => console.log(err));
        }),
    );
}

module.exports = something;
