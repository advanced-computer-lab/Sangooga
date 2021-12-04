const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/index");
const userRouter = require("./routes/userRoutes");
const flightRouter = require("./routes/flightRoutes");
const port = process.env.PORT || "5000";
const auth = require("./middleware/auth");
const Flight = require("./models/flight");

const mongoURI = `mongodb+srv://${config.username}:${config.password}@sangooga.ip60v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(cors());
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/user", userRouter);
app.use("/flight", flightRouter);

/*
app.get("/getSeats/:id", async (req, res) => {
  const flightNumbers = req.query.Numbers;
  const { id } = req.params;
  console.log("flightNumbers is:", flightNumbers);
  console.log("Id is:", id);
  const chosenFlight = await Flight.findOne({
    _id: id,
  });
  console.log("Chosen Flight is:", chosenFlight);
  res.send(chosenFlight);
  //res.status(200).json(chosenFlights);
});

app.put("/chooseEconomySeat", async (req, res) => {
  const id = req.body.id;
  const userID = req.body.userID;
  console.log("id in backend is:", id);
  //CHECK IF SEAT IS AVAIALABLE FIRST
  const result = await Flight.find({ "economySeatsArray._id": id });
  console.log("result is:", result);
  console.log("result.economySeatsArray:", result[0].economySeatsArray);
  var taken = 0;
  for (var i = 0; i < result[0].economySeatsArray.length; i++) {
    if (result[0].economySeatsArray[i]._id == id) {
      taken = result[0].economySeatsArray[i].available;
    }
  }
  console.log("Taken is:", taken);
  if (taken) {
    await Flight.updateOne(
      { "economySeatsArray._id": id },
      {
        $set: {
          "economySeatsArray.$.available": false,
          "economySeatsArray.$.reservedByUserID": userID,
        },
      }
    );
  } else {
    console.log("Seat already Taken");
    res.send("Seat already Taken");
  }
});

app.put("/chooseBusinessSeat", async (req, res) => {
  const id = req.body.id;
  const userID = req.body.userID;
  console.log("id in backend is:", id);
  //CHECK IF SEAT IS AVAIALABLE FIRST
  const result = await Flight.find({ "businessSeatsArray._id": id });
  console.log("result is:", result);
  console.log("result.businessSeatsArray:", result[0].businessSeatsArray);
  var taken = 0;
  for (var i = 0; i < result[0].businessSeatsArray.length; i++) {
    if (result[0].businessSeatsArray[i]._id == id) {
      taken = result[0].businessSeatsArray[i].available;
    }
  }
  console.log("Taken is:", taken);
  if (taken) {
    await Flight.updateOne(
      { "businessSeatsArray._id": id },
      {
        $set: {
          "businessSeatsArray.$.available": false,
          "businessSeatsArray.$.reservedByUserID": userID,
        },
      }
    );
  } else {
    console.log("Seat already Taken");
    res.send("Seat already Taken");
  }
});

app.put("/chooseFirstClassSeat", async (req, res) => {
  const id = req.body.id;
  const userID = req.body.userID;
  console.log("id in backend is:", id);
  //CHECK IF SEAT IS AVAIALABLE FIRST
  const result = await Flight.find({ "firstClassSeatsArray._id": id });
  console.log("result is:", result);
  console.log("result.firstClassSeatsArray:", result[0].firstClassSeatsArray);
  var taken = 0;
  for (var i = 0; i < result[0].firstClassSeatsArray.length; i++) {
    if (result[0].firstClassSeatsArray[i]._id == id) {
      taken = result[0].firstClassSeatsArray[i].available;
    }
  }
  console.log("Taken is:", taken);
  if (taken) {
    await Flight.updateOne(
      { "firstClassSeatsArray._id": id },
      {
        $set: {
          "firstClassSeatsArray.$.available": false,
          "firstClassSeatsArray.$.reservedByUserID": userID,
        },
      }
    );
  } else {
    console.log("Seat already Taken");
    res.send("Seat already Taken");
  }
});
*/

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
