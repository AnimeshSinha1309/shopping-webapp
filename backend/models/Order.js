import { model, Schema } from "mongoose";

// Schema
const orderSchema = new Schema({
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
        },
        count: {
            type: Number,
            required: true,
        },
    }),
    Order = model("Order", orderSchema);

export default Order;
