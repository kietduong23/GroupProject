const express = require('express');
const router = express.Router();
const Seller = require("../models/Seller");

router.get('/:sellerID', async (req, res) => {
    try {
        const seller = Customer.findById(req.params.sellerID);
        res.json({ success: true, msg: 'Sucessfully retrieved seller', seller });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Server error' });
    }
})


exports.authRoute = router