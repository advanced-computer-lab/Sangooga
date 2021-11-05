const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const mongoose = require("mongoose");

router
  .route("/")
  .get(async (req, res) => {
    const flights = await Flight.find();
    res.send(flights);
  })
  .post(async (req, res) => {
    const newFlight = new Flight({
      flightNumber: req.body.flightNumber,
      departureAirport: req.body.departureAirport,
      departureDateTime: req.body.departureDateTime,
      arrivalAirport: req.body.arrivalAirport,
      arrivalDateTime: req.body.arrivalDateTime,
      economySeats: req.body.economySeats,
      economyPrice: req.body.economyPrice,
      businessSeats: req.body.buisnessSeats,
      businessPrice: req.body.buisnessPrice,
      firstClassSeats: req.body.firstClassSeats,
      firstClassPrice: req.body.firstClassPrice,
    });
    const flight = await newFlight.save();
    console.log(flight);
  })
  .put(async (req, res) => {});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send(`No flight with ${id}`);

  await Flight.findByIdAndDelete(id);
  res.json("Deleted");
});

module.exports = router;
