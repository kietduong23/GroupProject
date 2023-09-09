const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desription: {
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }
);

const Product = mongoose.model("Product", productScheme);

module.exports = Product;