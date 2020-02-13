/* eslint-disable no-unused-vars */
// https://www.tutorialkart.com/nodejs/mongoose/insert-document-to-mongodb/

const mongoose = require("mongoose"),
    { Customer, Vendor } = require("../models/User");

// this is required, otherwise .save doesn't work
const dbName = "test";

// connect to a particular database in mongod instance
mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

// open the database connection
db.once("open", () => {
    console.log("Conected successfully");

    // product model is already imported
    // create a new instance of it
    // const cust = new Customer({ email: "d@c.com", password: "10000", orders: [] });

    const callback = (err, obj) => {
        if (err) { console.error(err); } else { console.log(obj, "updated"); }
    };
    // save this to the database
    // eslint-disable-next-line no-shadow
    // Vendor.updateOne({ email: "d@c.com" }, { name: "rockstar" }, callback);
    // cust.save();
});
