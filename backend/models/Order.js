const { model, Schema } = require("mongoose"),
    // Schema
    orderSchema = new Schema({
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        count: {
            type: Number,
            required: true,
        },
    }),
    Order = model("Order", orderSchema);

module.exports = Order;
