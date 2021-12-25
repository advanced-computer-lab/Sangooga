const express = require("express");
const router = express.Router();
const flightServices = require("../services/flightServices");
const auth = require("../middleware/auth");
router.use(auth);

router.route("/").get(flightServices.getFlights);

module.exports = router;
