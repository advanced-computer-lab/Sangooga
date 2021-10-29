const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    countryCode: {
      type: Number,
      required: true,
    },
    telephoneNumber: {
      type: [Number],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
