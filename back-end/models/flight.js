const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const seatSchema = new Schema({
  seatNumber: {
    type: Number,
  },
  seatClass: {
    type: String,
    enum: ["economy_class", "first_class", "business_class"],
  },
  seatPrice: {
    type: Number,
  },
  seatTaken: {
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
  {
    timestamps: true,
  }
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
      default: new Date(),
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    arrivalDateTime: {
      type: Date,
      default: new Date(),
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
    duration: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);
const Seat = mongoose.model("Seat", seatSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);
const Flight = mongoose.model("Flight", flightSchema);

module.exports = {
  Flight,
  Reservation,
  Seat,
};
