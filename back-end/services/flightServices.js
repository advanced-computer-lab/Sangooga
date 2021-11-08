const Flight = require("../models/flight");

const createFlight = async (req, res) => {
  async (req, res) => {
    const newFlight = new Flight(req.body);
    console.log(newFlight);
    const flight = await newFlight.save();
    console.log(flight);
    res.send(flight);
  };
};

const updateFlight = async (req, res) => {
  const { id } = req.params;
  const updatedFlight = await Flight.updateOne({ _id: id }, req.body);
  console.log(updatedFlight);
  res.send(updatedFlight);
};

const deleteFlight = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send(`No flight with ${id}`);

  await Flight.findByIdAndDelete(id);
  res.json("Deleted");
};

const getFlights = async (req, res) => {
  const flights = await Flight.find();
  res.send(flights);
};
module.exports = { createFlight, updateFlight, deleteFlight, getFlights };
