// https://www.tutorialkart.com/nodejs/mongoose/insert-document-to-mongodb/

const mongoose = require("mongoose"),
    Product = require("../models/Product");

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
    const prod1 = new Product({ name: "Icecreams", price: "1000", quantity: 1000 });

    // save this to the database
    prod1.save((err, product) => {
        if (err) { console.error(err); } else { console.log(`${product.name} saved to collection`); }
    });
});
