const { Reservation, Seat } = require("../models/flight");
const mongoose = require("mongoose");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const config = require("../config/index");
const emailReservation = async (req, res) => {
  try {
    const {
      user,
      depReservationNumber,
      depFlight,
      depSeats,
      retReservationNumber,
      retFlight,
      retSeats,
    } = req.body;
    // console.log("------------------", depReservationNumber);
    // console.log("Flight", depFlight);
    // console.log("seats", depSeats);
    // console.log(retReservationNumber);
    // console.log(retFlight);
    // console.log(retSeats);

    const userData = await User.findOne({ _id: user });
    const userEmail = userData.email;
    var seatsDep = [];
    var seatsRet = [];
    var seatsDepPrice = 0;
    var seatsRetPrice = 0;
    //console.log("sbeforeeatsDepBitch1", );
    depSeats.forEach((seat) => {
      seatsDep.push(seat.seatNumber);
      seatsDepPrice = seatsDepPrice + seat.seatPrice;
    });

    retSeats.forEach((seat) => {
      seatsRet.push(seat.seatNumber);
      seatsRetPrice = seatsRetPrice + seat.seatPrice;
    });

    console.log("seatsDepBitch1", seatsDep);
    console.log("seatsDepBitch2", seatsRet);
    console.log("seatsDepBitch3", seatsRetPrice);
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
      subject: "Yo",
      text:
        "Departure Reservation Number: " +
        depReservationNumber +
        "\n" +
        "Departure Trip: " +
        depFlight.departureAirport +
        " to " +
        depFlight.arrivalAirport +
        "\n" +
        "Leaves: " +
        depFlight.departureDateTime +
        "\n" +
        "Arrives: " +
        depFlight.arrivalDateTime +
        "\n" +
        "Cabin: " +
        retSeats[0].seatClass +
        "\n" +
        "Seats: " +
        seatsDep +
        "\n" +
        "Price: " +
        seatsDepPrice +
        "\n" +
        "--------------------------------------" +
        "\n" +
        "Return Reservation Number: " +
        retReservationNumber +
        "\n" +
        "Return Trip: " +
        retFlight.departureAirport +
        " to " +
        retFlight.arrivalAirport +
        "\n" +
        "Leaves: " +
        retFlight.departureDateTime +
        "\n" +
        "Arrives: " +
        retFlight.arrivalDateTime +
        "\n" +
        "Cabin: " +
        retSeats[0].seatClass +
        "\n" +
        "Seats: " +
        seatsRet +
        "\n" +
        "Price: " +
        seatsRetPrice,
    };
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
const createReservation = async (req, res) => {
  try {
    // console.log("ReservationNumber is:", req.body.reservationNumber);
    const seats = req.body.seats;
    //console.log("Seats are:", seats);
    const reservation = await new Reservation({
      reservationNumber: req.body.reservationNumber,
      user: req.body.user,
      flight: req.body.flight,
      seats: seats,
    });
    //console.log("Seat IDs:", seats);
    for (var i = 0; i < seats.length; i++) {
      const result = await Seat.find({
        _id: seats[i],
      });
      //console.log("seat result is:", seats[i]);

      if (result[0].seatStatus == true) {
        await Seat.updateOne(
          {
            _id: seats[i],
          },
          {
            $set: {
              seatStatus: false,
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
    console.log(reservationCost);
    const reservation = await Reservation.deleteOne({
      _id: reservationId,
    });
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

const updateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    console.log(reservationId);
    const updatedReservation = await Reservation.updateOne(
      {
        _id: reservationId,
      },
      req.body
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).send("Could not update reservation");
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getUserReservations,
  deleteReservation,
  getReservation,
  emailReservation,
  updateReservation,
};
