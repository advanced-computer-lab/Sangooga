const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber: {
    type: Number,
    unique: true,
  },
  available: {
    type: Number,
  },
  reservedByUserID: {
    type: String,
  },
});

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
