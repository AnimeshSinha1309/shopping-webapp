const { model, Schema } = require("mongoose");

// Schema
const productSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        quantityRem: {
            type: Number,
        },
        vendor: {
            type: String,
            required: true,
        },
    }),
    Product = model("Product", productSchema);


module.exports = Product;
