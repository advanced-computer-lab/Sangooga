const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/index");
const userRouter = require("./routes/userRoutes");
const flightRouter = require("./routes/flightRoutes");
const reservationRouter = require("./routes/reservationRoutes");
const port = process.env.PORT || "5000";
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = `mongodb+srv://${config.username}:${config.password}@sangooga.ip60v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.get("/verifyToken", auth, (req, res) => {
  res.status(200).send("authorized user");
});

app.use("/user", userRouter);
app.use("/flight", flightRouter);
app.use("/reservation", reservationRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
