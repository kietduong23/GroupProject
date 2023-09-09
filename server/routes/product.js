const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, msg: 'Retrieved all products', products });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

router.post("/", async (req, res) => {
    const {name, description, imgURL, price, category, sellerID} = req.body;
    try {
        const newProduct = new Product({
            name: name,
            desription: description,
            imgURL: imgURL,
            price: price,
            category: category,
            seller: sellerID,
        });
        await newProduct.save();
        res.json({ success: true, msg: 'New product created', newProduct });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})


exports.productRoute = router
