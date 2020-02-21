const { model, Schema } = require("mongoose");

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
        name: {
            type: String,
            required: true,
        },
    });

    if (add) { schema.add(add); }

    return schema;
}

const Vendor = model("Vendor", genSchema({ rating: Number })),
    Customer = model("Customer", genSchema());

module.exports = { Customer, Vendor };
