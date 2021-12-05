const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  console.log("lol");
  const token =
    req.body.token || req.query.token || req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(403).send("No token is supplied");
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status("401").send("unauthorized access");
  }
};

module.exports = auth;
