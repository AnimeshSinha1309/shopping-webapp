import { model, Schema } from "mongoose";

// Schema
function genSchema(add) {
    const schema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    });

    if (add) { schema.add(add); }

    return schema;
}

const Vendor = model("Vendor", genSchema()),
    Customer = model("Customer", genSchema({ orders: [{ type: Schema.Types.ObjectId, required: true, ref: "Order" }] }));

export default { Customer, Vendor };
