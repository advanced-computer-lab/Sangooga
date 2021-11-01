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
.route("/login/:userName/:password")
.get(async (req, res) => {
  const inputUsername = req.params.userName;
  const inputPassword = req.params.password;
  const one = await User.findOne({username: inputUsername, password: inputPassword});
  if(await User.findOne({username: inputUsername, password: inputPassword}))
  {
    res.send(true) ;
    console.log(res);
  }
  else
  {
    res.send(false);
  }
})
.post(async (req, res) => {})
.put(async (req, res) => {})
.delete(async (req, res) => {});

module.exports = router;
