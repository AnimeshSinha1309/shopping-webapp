const { model, Schema } = require("mongoose"),
    // eslint-disable-next-line camelcase
    mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");


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
    status: {
        type: Number,
    },
    vendor: {
        type: String,
        required: true,
    },
});

productSchema.plugin(mongoose_fuzzy_searching, { fields: ["name"] });

const Product = model("Product", productSchema);


module.exports = Product;
