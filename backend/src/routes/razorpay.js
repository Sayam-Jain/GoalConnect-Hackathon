const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
    const { amount } = req.body; 
    try {
        const options = {
            amount: amount, 
            currency: "INR",
            receipt: "order_rcptid_11",
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

module.exports = router
