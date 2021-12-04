const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber: {
    type: Number,
    unique: true,
  },
  available: {
    type: Boolean,
  },
  reservedByUserID: {
    type: String,
  },
});

const flightSchema = new Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    departureDateTime: {
      type: Date,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    arrivalDateTime: {
      type: Date,
      required: true,
    },
    economySeats: {
      type: Number,
      required: true,
    },
    economyPrice: {
      type: Number,
      required: true,
    },
    businessSeats: {
      type: Number,
      required: true,
    },
    businessPrice: {
      type: Number,
      required: true,
    },
    firstClassSeats: {
      type: Number,
      required: true,
    },
    firstClassPrice: {
      type: Number,
      required: true,
    },
    economySeatsArray: [seatSchema],
    businessSeatsArray: [seatSchema],
    firstClassSeatsArray: [seatSchema],
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
