const User = require("../models/user");

const loginRequest = async (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  console.log(inputUsername, inputPassword);
  const user = await User.findOne({
    username: inputUsername,
    password: inputPassword,
  });
  if (user) {
    console.log("true");
    res.send(true);
  } else {
    console.log("false");
    res.send(false);
  }
};

module.exports = { loginRequest };
