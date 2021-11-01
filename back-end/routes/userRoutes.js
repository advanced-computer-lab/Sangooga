const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
  .route("/")
  .get(async (req, res) => {})
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

router
.route("/login")
.get(async (req, res) => {})
.post(async (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  console.log(inputUsername,inputPassword)
  const user = await User.findOne({username: inputUsername, password: inputPassword});
  console.log(user);
  if(user)
  {
    console.log("true")
    res.send(true) ;
  }
  else
  {
    console.log("false")
    res.send(false);
  }
})
.put(async (req, res) => {})
.delete(async (req, res) => {});

module.exports = router;
