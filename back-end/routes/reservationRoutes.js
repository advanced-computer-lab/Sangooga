const express = require("express");
const router = express.Router();
const reservationServices = require("../services/reservationServices");
const auth = require("../middleware/auth");
// router.use(auth);

router
  .route("/")
  .post(reservationServices.createReservation)
  .get(reservationServices.getAllReservations);

router.route("/user/:id").get(reservationServices.getUserReservations);
router.route("/email").post(reservationServices.emailReservation);

router
  .route("/:reservationId")
  .get(reservationServices.getReservation)
  .delete(reservationServices.deleteReservation);

module.exports = router;
