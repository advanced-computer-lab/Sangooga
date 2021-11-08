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
        id="departure-input"
        label="Departure"
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
        id="airport-input"
        label="Arrival"
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

      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          label="Departure from date"
          value={departureFromDate}
          onChange={(e) => {
            setDepartureFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
          }}
          renderInput={(params) => <TextField {...params} />}
        ></DateTimePicker>
        <DateTimePicker
          label="Departure to date"
          value={departureToDate}
          onChange={(e) => {
            setDepartureToDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
          }}
          renderInput={(params) => <TextField {...params} />}
        ></DateTimePicker>

        <DateTimePicker
          label="Arrival from date"
          value={arrivalFromDate}
          onChange={(e) => {
            setArrivalFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
          }}
          renderInput={(params) => <TextField {...params} />}
        ></DateTimePicker>
        <DateTimePicker
          label="Arrival to date"
          value={arrivalToDate}
          onChange={(e) => {
            setArrivalToDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
          }}
          renderInput={(params) => <TextField {...params} />}
        ></DateTimePicker>
      </LocalizationProvider>
    </div>
  );
};

export default Search;
