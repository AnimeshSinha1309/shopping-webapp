import { model, Schema } from "mongoose";

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
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
        },
    }),
    Product = model("Product", productSchema);


export default Product;
