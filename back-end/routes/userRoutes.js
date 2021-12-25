const express = require("express");
const router = express.Router();
const userServices = require("../services/userServices");
const auth = require("../middleware/auth");

router.route("/").get(userServices.getUsers);
router
  .route("/:id")
  .get(userServices.getUser)
  .delete([auth], userServices.deleteUser)
  .patch([auth], userServices.updateUser);
router.route("/login").post(userServices.login);
router.route("/register").post(userServices.register);
router.route("/profile/:id").patch([auth], userServices.updatePass);

module.exports = router;
