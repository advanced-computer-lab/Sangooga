const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/index");
const userRouter = require("./routes/userRoutes");
const flightRouter = require("./routes/flightRoutes");
const port = process.env.PORT || "5000";
const mongoURI = `mongodb+srv://${config.username}:${config.password}@sangooga.ip60v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(cors());
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/user", userRouter);
app.use("/flight", flightRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
