// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);
const express = require('express');
const paymentRouter = express.Router();


const YOUR_DOMAIN = 'http://192.168.196.82:3000/';

paymentRouter.post('/', async (req, res) => {
    const { priceId, amount, product } = req.body;
    
    const session = await stripe.checkout.sessions.create({
        line_items: [
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: amount,
        },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/order/${product}?success=false`,
    });

    res.redirect(303, session.url);
});

module.exports = paymentRouter;