import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Looks6Icon from "@mui/icons-material/Looks6";
import "./Search.css";

const Search = ({ setFlights, originalFlights }) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureFromDate, setDepartureFromDate] = useState(null);
  const [departureToDate, setDepartureToDate] = useState(null);
  const [arrivalFromDate, setArrivalFromDate] = useState(null);
  const [arrivalToDate, setArrivalToDate] = useState(null);

  const log = (e) => {
    console.log(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
  };

  useEffect(() => {
    const searchFunc = () => {
      const filteredFlights = originalFlights.filter(
        (flight) =>
          (flightNumber === "" ||
            JSON.stringify(flight.flightNumber)
              .toLowerCase()
              .includes(flightNumber.toLowerCase())) &&
          (arrivalAirport === "" ||
            JSON.stringify(flight.arrivalAirport)
              .toLowerCase()
              .includes(arrivalAirport.toLowerCase())) &&
          (departureAirport === "" ||
            JSON.stringify(flight.departureAirport)
              .toLowerCase()
              .includes(departureAirport.toLowerCase())) &&
          (departureFromDate == null ||
            departureFromDate < flight.departureDateTime) &&
          (departureToDate == null ||
            departureToDate > flight.departureDateTime) &&
          (arrivalFromDate == null ||
            arrivalFromDate < flight.arrivalDateTime) &&
          (arrivalToDate == null || arrivalToDate > flight.arrivalDateTime)
      );
      setFlights(filteredFlights);
    };
    searchFunc();
  }, [
    originalFlights,
    flightNumber,
    arrivalAirport,
    departureAirport,
    departureFromDate,
    departureToDate,
    arrivalFromDate,
    arrivalToDate,
  ]);

  return (
    <div className="searchBar">
      <SearchIcon fontSize="large" />
      <TextField
        sx={{ background: "white", borderRadius: 1 }}
        id="flight-number-input"
        label="Flight Number"
        variant="outlined"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Looks6Icon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ background: "white", borderRadius: 1 }}
        id="departure-input"
        label="Leaving from"
        variant="outlined"
        value={departureAirport}
        onChange={(e) => setDepartureAirport(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <FlightTakeoffIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ background: "white", borderRadius: 1 }}
        id="airport-input"
        label="Going to"
        variant="outlined"
        value={arrivalAirport}
        onChange={(e) => setArrivalAirport(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <FlightLandIcon />
            </InputAdornment>
          ),
        }}
      />
      <LocalizationProvider
        dateAdapter={DateAdapter}
        sx={{ background: "white", borderRadius: 1 }}
      >
        <div className="date-range">
          <DateTimePicker
            sx={{ background: "white", borderRadius: 1 }}
            label="Departing"
            value={departureFromDate}
            onChange={(e) => {
              setDepartureFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            sx={{ background: "white", borderRadius: 1 }}
            label="Returning"
            value={arrivalFromDate}
            onChange={(e) => {
              setArrivalFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default Search;
