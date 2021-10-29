const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");

router
  .route("/")
  .get(async (req, res) => {
    const flights = await Flight.find();
    console.log(flights);
    res.send(flights);
  })
  .post(async (req, res) => {
    const flight = new Flight({
      flightNumber: 155,
      departure: 24 / 12 / 2020,
      arrival: 25 / 12 / 2020,
      economySeats: 213,
      businessSeats: 12,
      airport: "Cairo",
    });
    const newFlight = await flight.save();
    console.log(newFlight);
    res.send(newFlight);
  })
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

module.exports = router;
