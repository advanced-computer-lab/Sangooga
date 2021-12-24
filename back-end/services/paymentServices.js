const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.static("public"));

const createCheckoutSession = async (req, res) => {
  const getUser = async (id) => {
    try {
      const user = await User.findById(id);
    } catch (err) {}
  };
  const currentUserId = req.body.departureData.user;

  const currentUser = getUser(currentUserId);
  const stripeCustomerId = currentUser.stripeid;
  const departureData = req.body.departureData;
  const returnData = req.body.returnData;

  const checoutSession = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/paymentSuccess",
    cancel_url: "http://localhost:3000/reservationItinerary",
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Flight ${departureData.reservationNumber}` },
          unit_amount: req.body.departureData.departurePrice * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Flight ${returnData.reservationNumber}` },
          unit_amount: req.body.returnData.departurePrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.json({
    url: checoutSession.url,
  });
};

module.exports = { createCheckoutSession };
