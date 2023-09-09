const express = require('express');
const router = express.Router();
const Customer = require("../models/Customer");
const Seller = require("../models/Seller");

router.post('/register/customer', async (req, res) => {
    const { name, email, password, address, phone } = req.body

    if (!email || !password || !phone) {
        return res.status(400).json({ success: false, msg: 'Account information cannot be empty' })
    }
    try {
        const user = await Customer.findOne({ email: email })
        if (user) {
            return res.status(400).json({ success: false, msg: 'Email already existed' })
        }
        // const saltRounds = 8
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPwd = await bcrypt.hash(password, salt);
        const newCustomer = new Customer({
            name: name,
            email: email,
            password: password,
            address: address,
            phone: phone,
            shoppingCart: [],
            orders: []
        });
        await newCustomer.save();
        // const secretKey = '230602'
        // const accessToken = jwt.sign({ userID: newUser._id }, secretKey)
        res.json({ success: true, msg: 'Customer account sucessfully created', newCustomer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Server error' })
    }
})

router.post('/register/seller', async (req, res) => {
    const { name, email, password, businessName, phone } = req.body

    if (!email || !password || !phone) {
        return res.status(400).json({ success: false, msg: 'Account information cannot be empty' })
    }
    try {
        const user = await Seller.findOne({ email: email })
        if (user) {
            return res.status(400).json({ success: false, msg: 'Email already existed' })
        }
        // const saltRounds = 8
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPwd = await bcrypt.hash(password, salt);
        const newSeller = new Seller({
            name: name,
            email: email,
            password: password,
            businessName: businessName,
            phone: phone,
            products: [],
            orders: []
        })
        await newSeller.save()
        // const secretKey = '230602'
        // const accessToken = jwt.sign({ userID: newUser._id }, secretKey)
        res.json({ success: true, msg: 'Seller account sucessfully created', newSeller })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Server error' })
    }
})

exports.authRoute = router