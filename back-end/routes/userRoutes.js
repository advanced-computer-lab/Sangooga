const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
  .route("/")
  .get(async (req, res) => {})
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

module.exports = router;
