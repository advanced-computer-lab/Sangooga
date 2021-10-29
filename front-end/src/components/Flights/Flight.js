import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FlightCard = () => {
  const [flights, setFlights] = useState([]);

  useEffect(async () => {
    const result = await axios("http://localhost:5000/flight");
    setFlights(result.data);
    console.log(flights);
  });

  return (
    <div>
      {flights.map((flight) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">
              Flight Number: {flight.flightNumber}
            </Typography>
            <Typography variant="h6">Airport: {flight.airport}</Typography>
            <Typography sx={{ mb: 1.5 }}>Arrival: {flight.arrival}</Typography>
            <Typography sx={{ mb: 1.5 }}>
              Departure: {flight.departure}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Economy Seats: {flight.economySeats}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Business Seats: {flight.businessSeats}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default FlightCard;
