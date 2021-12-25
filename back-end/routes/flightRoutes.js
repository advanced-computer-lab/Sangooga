const express = require("express");
const router = express.Router();
const flightServices = require("../services/flightServices");
const auth = require("../middleware/auth");
// router.use(auth);

router
  .route("/")
  .get(flightServices.getFlights)
  .post(auth, flightServices.createFlight);

router.route("/filter").post(flightServices.filterFlights);

router
  .route("/:id")
  .get(flightServices.getFlightById)
  .put(auth, flightServices.updateFlight)
  .delete(auth, flightServices.deleteFlight);

module.exports = router;
