const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.header("Authorization");
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
