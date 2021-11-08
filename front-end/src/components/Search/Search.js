import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Search.css";

const Search = ({ setFlights, originalFlights }) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("");

  useEffect(() => {
    const searchFunc = () => {
      const filteredFlights = originalFlights.filter(
        (flight) =>
          (flightNumber === "" ||
            JSON.stringify(flight.flightNumber)
              .toLowerCase()
              .includes(flightNumber.toLowerCase())) &&
          (airport === "" ||
            JSON.stringify(flight.airport)
              .toLowerCase()
              .includes(airport.toLowerCase()))
      );
      setFlights(filteredFlights);
    };
    searchFunc();
  }, [originalFlights, flightNumber, airport]);

  return (
    <div className="searchBar">
      <span></span>
      <Typography variant="h6">Search by: </Typography>
      <Box sx={{ display: "inline" }}>
        <TextField
          id="flight-number-input"
          label="Flight Number"
          variant="outlined"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "inline", margin: 2 }}>
        <TextField
          id="airport-input"
          label="Airport"
          variant="outlined"
          value={airport}
          onChange={(e) => setAirport(e.target.value)}
        />
      </Box>
    </div>
  );
};

export default Search;
