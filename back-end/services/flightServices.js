const { Flight, Seat } = require("../models/flight");
const mongoose = require("mongoose");
const moment = require("moment");

const createFlight = async (req, res) => {
  try {
    const seatIds = [];
    console.log(req.body);
    // const seats = req.body.seats;
    const economySeats = parseInt(req.body.economySeats);
    const economyPrice = parseInt(req.body.economyPrice);
    const businessSeats = parseInt(req.body.businessSeats);
    const businessPrice = parseInt(req.body.businessPrice);
    const firstClassSeats = parseInt(req.body.firstClassSeats);
    const firstClassPrice = parseInt(req.body.firstClassPrice);

    if (economySeats || businessSeats || firstClassSeats) {
      for (let i = economySeats; i > 0; i--) {
        const flightSeat = await new Seat({
          seatNumber: i + 1,
          seatClass: "economy_class",
          seatPrice: economyPrice,
          seatTaken: false,
        }).save();
        seatIds.push(flightSeat._id);
      }

      for (let i = businessSeats; i > 0; i--) {
        const flightSeat = await new Seat({
          seatNumber: i + 1,
          seatClass: "business_class",
          seatPrice: businessPrice,
          seatTaken: false,
        }).save();
        seatIds.push(flightSeat._id);
      }
      for (let i = firstClassSeats; i > 0; i--) {
        const flightSeat = await new Seat({
          seatNumber: i + 1,
          seatClass: "first_class",
          seatPrice: firstClassPrice,
          seatTaken: false,
        }).save();
        seatIds.push(flightSeat._id);
      }
    }
    const flight = await new Flight({
      flightNumber: parseInt(req.body.flightNumber),
      departureAirport: req.body.departureAirport,
      departureDateTime: req.body.departureDateTime,
      arrivalAirport: req.body.arrivalAirport,
      arrivalDateTime: req.body.arrivalDateTime,
      duration: parseInt(req.body.duration),
      baggageAllowance: parseInt(req.body.baggageAllowance),
      seats: seatIds,
    }).save();
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No flight with ${id}`);
    const updatedFlight = await Flight.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.status(200).json(updatedFlight);
  } catch (err) {
    res.status(400).send("Could not update flight");
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.send(`No flight with ${id}`);
    const deletedFlight = await Flight.findByIdAndDelete(id);
    res.status(200).json(deletedFlight);
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not delete flight");
  }
};

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate("seats").exec();
    res.status(200).json(flights);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id).populate("seats").exec();
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const filterFlights = async (req, res) => {
  let {
    flightNumber,
    arrivalAirport,
    departureAirport,
    departureDateTime,
    arrivalDateTime,
    numberOfSeats,
    selectedClass,
  } = req.body;

  const isNullorEmpty = (thing) => {
    if (thing == null || thing == "") return true;

    return false;
  };

  const maybeCreateMongoQuery = (prop, queryProp, value) => {
    return value == null || value === ""
      ? null
      : { [prop]: { [queryProp]: value } };
  };

  const maybeCreateMongoQueryTwoProps = (
    prop,
    queryProp,
    value,
    queryProp2,
    value2
  ) => {
    return value == null || value === ""
      ? null
      : { [prop]: { [queryProp]: value, [queryProp2]: value2 } };
  };

  if (
    isNullorEmpty(flightNumber) &&
    isNullorEmpty(arrivalAirport) &&
    isNullorEmpty(departureAirport) &&
    isNullorEmpty(departureDateTime) &&
    isNullorEmpty(arrivalDateTime)
  ) {
    getFlights(req, res);
  } else {
    try {
      const flights = await Flight.find({
        $and: [
          maybeCreateMongoQuery("flightNumber", "$eq", flightNumber),
          {
            $or: [
              {
                $and: [
                  maybeCreateMongoQuery(
                    "departureAirport",
                    "$eq",
                    departureAirport
                  ),
                  maybeCreateMongoQuery(
                    "arrivalAirport",
                    "$eq",
                    arrivalAirport
                  ),
                ].filter((q) => q !== null),
              },
              {
                $and: [
                  maybeCreateMongoQuery(
                    "departureAirport",
                    "$eq",
                    arrivalAirport
                  ),
                  maybeCreateMongoQuery(
                    "arrivalAirport",
                    "$eq",
                    departureAirport
                  ),
                ].filter((q) => q !== null),
              },
            ],
          },

          maybeCreateMongoQueryTwoProps(
            "departureDateTime",
            "$gte",
            departureDateTime,
            "$lte",
            moment(departureDateTime).format("YYYY-MM-DD[T23:59:59.000Z]")
          ),
          maybeCreateMongoQueryTwoProps(
            "arrivalDateTime",
            "$gte",
            arrivalDateTime,
            "$lte",
            moment(arrivalDateTime).format("YYYY-MM-DD[T23:59:59.000Z]")
          ),
        ].filter((q) => q !== null),
      })
        .populate("seats")
        .exec();
      res.send(flights);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

module.exports = {
  createFlight,
  updateFlight,
  deleteFlight,
  getFlights,
  getFlightById,
  filterFlights,
};
