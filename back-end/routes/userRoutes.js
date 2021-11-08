const express = require("express");
const router = express.Router();
const userServices = require("../services/userServices");

router.route("/login").post(userServices.loginRequest);

module.exports = router;
