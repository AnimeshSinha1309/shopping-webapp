/* eslint-disable no-unused-vars */
const createError = require("http-errors"),
    express = require("express"),
    mongoose = require("mongoose"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    logger = require("morgan"),
    // need this module to be able to make a request
    // from one localhost port onto another
    cors = require("cors"),

    usersRouter = require("./routes/users"),
    apiRouter = require("./routes/api"),
    config = require("./config/keys");

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connection: success"))
    .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", usersRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
