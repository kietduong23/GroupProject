const mongoose = require("mongoose");

const cartItemScheme = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
        ,
        quantity: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: 'new'
        }
    }
);

const CartItem = mongoose.model("CartItem", cartItemScheme);

module.exports = CartItem;