const { Flight, Seat } = require("../models/flight");
const mongoose = require("mongoose");

const createFlight = async (req, res) => {
  try {
    const seats = req.body.seats;
    const seatIds = [];
    for (const seat of seats) {
      const flightSeat = await new Seat(seat).save();
      seatIds.push(flightSeat._id);
    }
    const flight = await new Flight({ ...req.body, seats: seatIds });
    flight.save();
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No flight with ${id}`);
    const updatedFlight = await Flight.updateOne({ _id: id }, req.body);
    res.status(200).json(updatedFlight);
  } catch (err) {
    res.status(400).send("Could not update flight");
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.send(`No flight with ${id}`);
    const deletedFlight = await Flight.findByIdAndDelete(id);
    res.status(200).json(deletedFlight);
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not delete flight");
  }
};

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate("seats").exec();
    res.status(200).json(flights);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id).populate("seats").exec();
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
module.exports = {
  createFlight,
  updateFlight,
  deleteFlight,
  getFlights,
  getFlightById,
};
