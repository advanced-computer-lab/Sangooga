require("dotenv").config();
module.exports = {
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  secretOrPublicKey: process.env.JWT_SECRET,
  emailPassword: process.env.EMAIL_PASSWORD,
};
