const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const config = require("../config/index");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No user with ${id}`);
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Could not find any users");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No user with ${id}`);
    const updatedUser = await User.updateOne({ _id: id }, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).send("Could not update user");
  }
};
const updatePass = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    // console.log(oldPassword);
    // console.log(newPassword);
    // console.log(id);
    // if (!(oldPassword && newPassword)) {
    //   return res.status(400).send("All input is required");
    // }
    const user = await User.findOne({ _id: id });
    // console.log(user);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      hashedPass = await bcrypt.hash(newPassword, 10);
      const updatedPass = await User.updateOne(
        { _id: id },
        { password: hashedPass }
      );

      res.status(200).json(updatedPass);
    }
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token, ...user });
    }
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const register = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      passport,
      address,
      countryCode,
      phone,
    } = req.body;

    if (
      !(
        username &&
        password &&
        firstname &&
        lastname &&
        email &&
        passport &&
        phone &&
        countryCode &&
        address
      )
    ) {
      return res.status(400).send("Input is missing");
    }
    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) {
      return res.status(409).send("Username taken.");
    }
    const alreadyUsed = await User.findOne({ email });
    if (alreadyUsed) {
      return res.status(409).send("Email already has an account.");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: encryptedPassword,
      firstname,
      lastname,
      email,
      passport,
      address,
      countryCode,
      phone,
    });
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    user.token = token;
    // const transporter = nodemailer.createTransport({
    //   service: "hotmail",
    //   port: 587,
    //   secure: false, // upgrade later with STARTTLS
    //   auth: {
    //     user: "flights1000@outlook.com",
    //     pass: config.emailPassword,
    //   },
    // });
    // const options = {
    //   from: "flights1000@outlook.com",
    //   to: email,
    //   subject: "You have successfully made an account!",
    //   text: "Thank you for registering!",
    // };
    // transporter.sendMail(options, (err, info) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(info);
    // });

    res.status(201).json({ token, ...user });
  } catch (err) {
    res.status(400).send("Could not register");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("Could not get user");
  }
};

module.exports = {
  login,
  register,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
  updatePass,
};
