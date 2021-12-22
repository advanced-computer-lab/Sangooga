const {
  Flight,
  Seat
} = require("../models/flight");
const mongoose = require("mongoose");

const filterFlights = async (req, res) => {
  const {
    flightNumber,
    arrivalAirport,
    departureAirport,
    departureDateTime,
    arrivalDataTime,
    numberOfSeats,
    selectedClass,
  } = req.body;
  try {
    const flights = await Flight.find({
      departureAirport,
      arrivalAirport,
      departureDateTime: {
        $gte: departureDateTime
      },
      arrivalDataTime: {
        $lte: arrivalDataTime
      },
    }).populate("seats").exec();
    res.send(flights);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const createFlight = async (req, res) => {
  try {
    const seatIds = [];
    const seats = req.body.seats;
    if (seats) {
      for (const seat of seats) {
        const flightSeat = await new Seat(seat).save();
        seatIds.push(flightSeat._id);
      }
    } else {
      let seatClass = "";
      let seatPrice = 0;
      for (let i = 0; i <= 2; i++) {
        {
          if (i === 0) {
            seatClass = "first_class";
            seatPrice = 100;
          } else if (i === 1) {
            seatClass = "business_class";
            seatPrice = 200;
          } else if (i === 2) {
            seatClass = "economy_class";
            seatPrice = 100;
          }
          for (let j = 1; j <= 10; j++) {
            const flightSeat = await new Seat({
              seatNumber: j,
              seatClass,
              seatPrice,
              seatTaken: false,
            }).save();
            seatIds.push(flightSeat._id);
          }
        }
      }
    }

    const flight = await new Flight({
      ...req.body,
      seats: seatIds
    }).save();
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const updateFlight = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No flight with ${id}`);
    const updatedFlight = await Flight.updateOne({
      _id: id
    }, req.body);
    res.status(200).json(updatedFlight);
  } catch (err) {
    res.status(400).send("Could not update flight");
  }
};

const deleteFlight = async (req, res) => {
  try {
    const {
      id
    } = req.params;
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
    const {
      id
    } = req.params;
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
  filterFlights,
};