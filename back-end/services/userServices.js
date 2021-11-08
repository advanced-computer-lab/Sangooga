const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No user with ${id}`);
    const user = await User.findById(id);
  } catch (err) {
    res.status(400).send("Could not get users");
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
      res.cookie("auth", token);
      res.status(200).json({ token, ...user });
    }
  } catch (err) {
    res.status(400).send("Please enter correct credentials");
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("Input is missing");
    }
    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(201).json(user);
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

module.exports = { login, register, getUsers, deleteUser, getUser };
