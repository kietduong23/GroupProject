const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema(
    {
        cartItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CartItem'
            }
        ],
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    }
);

const Order = mongoose.model("Order", orderScheme);

module.exports = Order;