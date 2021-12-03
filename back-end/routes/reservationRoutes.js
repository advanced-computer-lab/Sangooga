const express = require("express");
const router = express.Router();
const reservationServices = require("../services/reservationServices");
const auth = require("../middleware/auth");
// router.use(auth);

router
  .route("/")
  .post(reservationServices.createReservation)
  .get(reservationServices.getAllReservations);

router.route("/:id").get(reservationServices.getUserReservations);

module.exports = router;
