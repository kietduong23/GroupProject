const express = require("express");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const router = express.Router();

router.get("/:customerID", async (req, res) => {
    const customerID = req.params.customerID;
    try {
        const orders = await Customer.find({customer: customerID});
        res.json({ success: true, msg: `Retrieved all orders of customer ${customerID}`, orders });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Create new order
router.post("/", async (req, res) => {
    const {customerID} = req.body;
    try {
        const customer = await Customer.findById(customerID);
        const newOrder = new Order({
            cartItems: customer.shoppingCart,
            customer: customerID,
            status: "new"
        });
        await newOrder.save();
        customer.orders = [...customer.orders, newOrder];
        customer.shoppingCart = [];
        await customer.save();
        res.json({ success: true, msg: 'New order created' , newOrder});
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})

// Update an order's status
router.put("/:orderID", async (req, res) => {
    const orderID = req.params.orderID;
    const {status} = req.body
    try {
        const order = await Order.findById(orderID);
        order.status = status;
        await order.save();
        res.json({ success: true, msg: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})


exports.orderRoute = router