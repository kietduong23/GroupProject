const mongoose = require('mongoose');

const customerScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        shoppingCart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CartItem'
            }
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            }
        ]
    }
);

const Customer = mongoose.model('Customer', customerScheme);

module.exports = Customer;