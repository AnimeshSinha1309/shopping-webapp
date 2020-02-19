const { model, Schema } = require("mongoose");


// Schema
const prodRatingSchema = new Schema({
        product: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
    }),
    ProdRating = model("ProductRating", prodRatingSchema),
    vendRatingSchema = new Schema({
        vendor: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
    }),
    VendRating = model("VendorRating", vendRatingSchema);


module.exports = { ProdRating, VendRating };
