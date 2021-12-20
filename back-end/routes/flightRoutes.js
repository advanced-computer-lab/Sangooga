const express = require("express");
const router = express.Router();
const flightServices = require("../services/flightServices");
const auth = require("../middleware/auth");
// router.use(auth);

router
  .route("/")
  .get(flightServices.getFlights)
  .post(flightServices.createFlight);

router.route("/filter").post(flightServices.filterFlights);

router
  .route("/:id")
  .get(flightServices.getFlightById)
  .put(flightServices.updateFlight)
  .delete(flightServices.deleteFlight);

module.exports = router;
