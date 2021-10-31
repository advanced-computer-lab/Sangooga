const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const mongoose =  require("mongoose");

router
  .route("/")
  .get(async (req, res) => {
    const flights = await Flight.find();
    res.send(flights);
  })
  .post(async (req, res) => {
    const flight = new Flight({
      flightNumber: 155,
      departure: 24 / 12 / 2020,
      arrival: 25 / 12 / 2020,
      economySeats: 213,
      businessSeats: 12,
      airport: "Cairo",
    });
    const newFlight = await flight.save();
    res.send(newFlight);
  })
  .put(async (req, res) => {})
 
 router.delete('/:id', async (req,res) =>{
     const {id} = req.params;
    
     if(!mongoose.Types.ObjectId.isValid(id))
          return res.send(`No flight with ${id}`)
    
        await Flight.findByIdAndDelete(id);
        res.json('Deleted');
      });

module.exports = router;
