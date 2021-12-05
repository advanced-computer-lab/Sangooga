const express = require("express");
const router = express.Router();
const userServices = require("../services/userServices");

router.route("/").get(userServices.getUsers);
router
  .route("/:id")
  .get(userServices.getUser)
  .delete(userServices.deleteUser)
  .patch(userServices.updateUser);
router.route("/login").post(userServices.login);
router.route("/register").post(userServices.register);

module.exports = router;
