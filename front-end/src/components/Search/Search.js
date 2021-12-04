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
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Search.css";

const Search = ({ setFlights, originalFlights, isAdmin }) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalAirportAdmin, setArrivalAirportAdmin] = useState("");
  const [departureAirportAdmin, setDepartureAirportAdmin] = useState("");
  const [departureFromDateAdmin, setDepartureFromDateAdmin] = useState(null);
  const [arrivalFromDateAdmin, setArrivalFromDateAdmin] = useState(null);

  // data that will be send to other components on click
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureFromDate, setDepartureFromDate] = useState(null);
  const [arrivalFromDate, setArrivalFromDate] = useState(null);

  const [numberOfSeats, setnumberOfSeats] = useState(1);
  const [selectedClass, setSelectedClass] = useState("economy");

  const changeDepartureAirport = (e) => {
    setDepartureAirport(e.target.value);
    if (isAdmin) setDepartureAirportAdmin(e.target.value);
  };

  const changeArrivalAirport = (e) => {
    setArrivalAirport(e.target.value);
    if (isAdmin) setArrivalAirportAdmin(e.target.value);
  };

  const changeDepartureFromDate = (e) => {
    if (e != null) {
      setDepartureFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
      if (isAdmin)
        setDepartureFromDateAdmin(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
    }
  };

  const changeArrivalFromDate = (e) => {
    if (e != null) {
      setArrivalFromDate(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
      if (isAdmin)
        setArrivalFromDateAdmin(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
    }
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
          (arrivalFromDate == null || arrivalFromDate < flight.arrivalDateTime)
      );
      setFlights(filteredFlights);
    };
    searchFunc();
  }, [
    originalFlights,
    flightNumber,
    arrivalAirportAdmin,
    departureAirportAdmin,
    departureFromDateAdmin,
    arrivalFromDateAdmin,
  ]);

  return (
    <div className="container">
      {!isAdmin && (
        <div className="dropDownsContainer">
          <div className="dropdown">
            <InputLabel id="numberSelector">Seats</InputLabel>
            <Select
              labelId="numberSelector"
              id="seatsNo"
              value={numberOfSeats}
              label="Age"
              onChange={(e) => {
                setnumberOfSeats(e.target.value);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={3}>4</MenuItem>
              <MenuItem value={3}>5</MenuItem>
              <MenuItem value={3}>6</MenuItem>
            </Select>
          </div>

          <div className="dropdown">
            <InputLabel id="classSelector">Class</InputLabel>
            <Select
              labelId="classSelector"
              id="class"
              value={selectedClass}
              label="Age"
              onChange={(e) => {
                setSelectedClass(e.target.value);
              }}
            >
              <MenuItem value={"economy"}>economy</MenuItem>
              <MenuItem value={"Business "}>Business</MenuItem>
              <MenuItem value={"First Class"}>First Class</MenuItem>
            </Select>
          </div>
        </div>
      )}
      <div className="searchBar">
        <SearchIcon fontSize="large" />
        {isAdmin && (
          <div>
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
          </div>
        )}
        <TextField
          sx={{ background: "white", borderRadius: 1 }}
          id="departure-input"
          label="Leaving from"
          variant="outlined"
          value={departureAirport}
          onChange={changeDepartureAirport}
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
          onChange={changeArrivalAirport}
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
              label="Departing"
              value={departureFromDate}
              onChange={changeDepartureFromDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="Returning"
              value={arrivalFromDate}
              onChange={changeArrivalFromDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
        {!isAdmin && (
          <Link to="/createFlight">
            <Button variant="contained" className="newFlightButton">
              Search Flights
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Search;
