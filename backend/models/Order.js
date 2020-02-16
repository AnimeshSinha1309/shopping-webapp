const { model, Schema } = require("mongoose"),
    // Schema
    // since foreign key relations ("ref") in mongoose/nosql are messed up
    // you can't really query by foreign key
    // so just store the ID values as strings
    orderSchema = new Schema({
        customer: {
            type: String,
            required: true,
        },
        product: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    }),
    Order = model("Order", orderSchema);

module.exports = Order;
