const { model, Schema } = require("mongoose");


// Schema
const ratingSchema = new Schema({
        vendor: {
            type: String,
            required: true,
        },
        customer: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    }),
    Rating = model("Rating", ratingSchema);


module.exports = Rating;
