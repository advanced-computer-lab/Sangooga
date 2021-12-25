const express = require("express");
const router = express.Router();
const paymentServices = require("../services/paymentServices.js");
const auth = require("../middleware/auth");

router
  .route("/createCheckoutSession")
  .post([auth], paymentServices.createCheckoutSession);

module.exports = router;
