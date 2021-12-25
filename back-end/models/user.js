const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "user",
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passport: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    stripeid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
