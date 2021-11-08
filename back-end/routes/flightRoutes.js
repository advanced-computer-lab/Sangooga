const express = require("express");
const router = express.Router();
const flightServices = require("../services/flightServices");
router
  .route("/")
  .get(flightServices.getFlights)
  .post(flightServices.createFlight);

router
  .route("/:id")
  .put(flightServices.updateFlight)
  .delete(flightServices.deleteFlight);

module.exports = router;
