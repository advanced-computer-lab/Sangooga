const { Reservation, Seat } = require("../models/flight");
const mongoose = require("mongoose");
const User = require("../models/user");

const createReservation = async (req, res) => {
  try {
    const seats = req.body.seats;
    const reservation = await new Reservation({ ...req.body, seats });
    console.log(reservation);
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
    const reservations = await Reservation.find({ user: id })
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.deleteOne({ _id: reservationId });
    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.find({ _id: reservationId })
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getUserReservations,
  deleteReservation,
  getReservation,
};
