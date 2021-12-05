const { Reservation, Seat } = require("../models/flight");
const mongoose = require("mongoose");

const createReservation = async (req, res) => {
  try {
    const seats = req.body.seats;
    const reservation = await new Reservation({ ...req.body, seats });
    reservation.save();
    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getUserReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await Reservation.find({ id })
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getUserReservations,
};
