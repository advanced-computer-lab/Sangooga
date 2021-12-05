const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const seatSchema = new Schema({
  seatNumber: {
    type: Number,
  },
  seatClass: {
    type: String,
    enum: [("business", "first class", "economy")],
  },
  seatPrice: {
    type: Number,
  },
  seatStatus: {
    type: Boolean,
    default: true,
  },
});

const reservationSchema = new Schema(
  {
    reservationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
    price: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  },
  { timestamps: true }
);

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
      default: () => {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let result = new Date(year + 1, month, day);
        return result;
      },
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    arrivalDateTime: {
      type: Date,
      default: () => {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let result = new Date(year, month, day);
        console.log(result);
        return result;
      },
    },
    baggageallowance: {
      type: Number,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
  },
  { timestamps: true }
);
const Seat = mongoose.model("Seat", seatSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);
const Flight = mongoose.model("Flight", flightSchema);

module.exports = {
  Flight,
  Reservation,
  Seat,
};
