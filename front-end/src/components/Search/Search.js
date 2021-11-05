import React, { useState, useEffect } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Search = ({ setFlights, originalFlights }) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("");

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

  useEffect(() => {
    searchFunc();
  }, [originalFlights, flightNumber, airport]);

  return (
    <div className="searchBar">
      <span>Search by:</span>
      <Box sx={{ display: "inline" }}>
        <TextField
          id="flight-number-input"
          label="Flight Number"
          variant="outlined"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "inline" }}>
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
