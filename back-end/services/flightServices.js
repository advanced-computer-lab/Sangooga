const Flight = require("../models/flight");
const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (err) {
    console.log(`${err}`);
  }
};

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).send(`No flight with ${id}`);
    const updatedFlight = await Flight.updateOne({ _id: id }, req.body);
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
    res.status(400).send("Could not delete flight");
  }
};

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(400).send("Could not get flights");
  }
};
module.exports = { createFlight, updateFlight, deleteFlight, getFlights };
