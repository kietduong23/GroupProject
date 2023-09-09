const express = require('express');
const router = express.Router();
const Customer = require("../models/Customer");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");

// Get customer infor
router.get('/:customerID', async (req, res) => {
    try {
        const customer = Customer.findById(req.params.customerID);
        res.json({ success: true, msg: 'Sucessfully retrieved customer', customer });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Get customer shopping cart
router.get("/:customerID/cart", async (req, res) => {
    const customerID = req.params.customerID;
    try {
        const customer = await Customer.findById(customerID).populate({
            path: 'shoppingCart',
            populate: { path: 'product' }
        });
        res.json({ success: true, msg: 'Retrieved shopping cart', shoppingCart: customer.shoppingCart });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Clear shopping cart
router.delete("/:customerID/cart", async (req, res) => {
    const customerID = req.params.customerID;
    try {
        const customer = await Customer.findById(customerID);
        for (let item of customer.shoppingCart) {
            await CartItem.deleteOne({ _id: item._id });
        }
        customer.shoppingCart = [];
        await customer.save();
        res.json({ success: true, msg: 'Customer shopping cart is cleared' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Add new item to shopping cart
router.post("/:customerID/cart", async (req, res) => {
    const { productID } = req.body;
    const customerID = req.params.customerID;
    try {
        const customer = await Customer.findById(customerID).populate("shoppingCart");
        for (let item of customer.shoppingCart) {
            if (item.product == productID) {
                return res.status(400).json({ success: false, msg: 'Product already existed' });
            }
        }
        const newItem = new CartItem({
            product: productID,
            quantity: 1
        });
        customer.shoppingCart = [...customer.shoppingCart, newItem];
        await customer.save();
        await newItem.save();
        const item = await CartItem.find({product: productID}).populate("product");
        res.json({ success: true, msg: 'New cart item added', item });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Update item's quantity in shopping cart
router.put("/:customerID/cart/:cartItemID", async (req, res) => {
    const { quantity } = req.body;
    const cartItemID = req.params.cartItemID;
    try {

        const cartItem = await CartItem.findById(cartItemID);
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ success: true, msg: 'Cart is updated' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Delete an item in shopping cart
router.delete("/:customerID/cart/:cartItemID", async (req, res) => {
    const customerID = req.params.customerID;
    const cartItemID = req.params.cartItemID;
    try {
        await CartItem.deleteOne({ _id: cartItemID });
        const customer = await Customer.findById(customerID);
        customer.shoppingCart = customer.shoppingCart.filter((item) => item._id != cartItemID)
        await customer.save();
        res.json({ success: true, msg: 'Cart item is deleted' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Get all orders of customer
router.get("/:customerID/order", async (req, res) => {
    const customerID  = req.params.customerID;
    try {
        const customer = await Customer.findOne({_id: customerID}).populate({
            path: 'orders',
            populate: { 
                path: 'cartItems',
                populate: 'product'
            }
        });
        // const orders = customer.orders;
        res.json({ success: true, msg: `Retrieved all orders of customer ${customerID}`, orders: customer.orders });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

exports.customerRoute = router