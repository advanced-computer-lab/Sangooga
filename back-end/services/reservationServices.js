const { Reservation, Seat } = require("../models/flight");
const mongoose = require("mongoose");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const config = require("../config/index");

const createReservation = async (req, res) => {
  try {
    console.log("ReservationNumber is:", req.body.reservationNumber);
    const seats = req.body.seats;
    console.log("Seats are:", seats);
    const reservation = await new Reservation({
      reservationNumber: req.body.reservationNumber,
      user: req.body.user,
      flight: req.body.flight,
      seats: seats,
    });
    console.log("Seat IDs:", seats);
    for (var i = 0; i < seats.length; i++) {
      const result = await Seat.find({
        _id: seats[i],
      });
      console.log("seat result is:", seats[i]);

      if (result[0].seatTaken == false) {
        await Seat.updateOne(
          {
            _id: seats[i],
          },
          {
            $set: {
              seatTaken: true,
            },
          }
        );
      } else {
        console.log("Seat Already Reserved");
      }
    }
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
    const reservations = await Reservation.find({
      user: id,
    })
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    console.log("RESERVATIONS IN BACKEND ARE:", reservations);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservationData = await Reservation.findOne({
      _id: reservationId,
    })
      .populate("flight")
      .populate("user")
      .populate("seats")
      .exec();
    const userEmail = reservationData.user.email;
    const reservationSeats = reservationData.seats;
    var reservationCost = 0;
    reservationSeats.forEach((seat) => {
      reservationCost += seat.seatPrice;
    });
    const reservation = await Reservation.deleteOne({
      _id: reservationId,
    });
    console.log(reservationCost);
    console.log("reservationSeats:", reservationSeats);
    console.log("reservationSeats.seats[0]:", reservationSeats[0]);
    console.log("reservationSeats[0]._id:", reservationSeats[0]._id);
    console.log("reservationSeats._id:", reservationSeats._id);

    for (let i = 0; i < reservationSeats.length; i++) {
      //const hob = await Seat.find({ _id: reservationSeats[i]._id });
      //console.log("hob", hob);
      await Seat.updateOne(
        {
          _id: reservationSeats[i]._id,
        },
        {
          $set: {
            seatTaken: false,
          },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "flights1000@outlook.com",
        pass: config.emailPassword,
      },
    });
    const options = {
      from: "flights1000@outlook.com",
      to: userEmail,
      subject: "You have successfully cancelled your reservation!",
      text: "Your refunded amount is: " + reservationCost,
    };
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    });

    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.find({
      _id: reservationId,
    })
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
