import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Looks6Icon from "@mui/icons-material/Looks6";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = ({ isAdmin }) => {
  const [flightNumber, setFlightNumber] = useState();
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState(null);
  const [arrivalDateTime, setArrivalDateTime] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [selectedClass, setSelectedClass] = useState("economy_class");
  const navigate = useNavigate();

  const filterFlights = async () => {
    try {
      const searchParams = {
        arrivalAirport: arrivalAirport.toUpperCase(),
        departureAirport: departureAirport.toUpperCase(),
        departureDateTime,
        arrivalDateTime,
        numberOfSeats,
        selectedClass,
      };
      let flights = await axios.post(
        "http://localhost:5000/flight/filter",
        searchParams,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );

      console.log(flights);

      flights.data = flights.data.filter(
        (flight) =>
          flight.seats.filter(
            (seat) => seat.seatClass === selectedClass && !seat.seatTaken
          ).length >= numberOfSeats
      );

      !isAdmin
        ? navigate("/flights", { state: flights.data })
        : navigate("/adminFlights", { state: flights.data });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="dropDownsContainer">
        <div className="dropdown">
          <InputLabel id="numberSelector">Seats</InputLabel>
          <Select
            labelId="numberSelector"
            id="seatsNo"
            value={numberOfSeats}
            label="Age"
            onChange={(e) => {
              setNumberOfSeats(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
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
            <MenuItem value={"economy_class"}>Economy</MenuItem>
            <MenuItem value={"business_class"}>Business</MenuItem>
            <MenuItem value={"first_class"}>First</MenuItem>
          </Select>
        </div>
      </div>

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
            <DatePicker
              label="Departing"
              value={departureDateTime}
              onChange={(e) => {
                if (e != null)
                  setDepartureDateTime(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
                else setDepartureDateTime(null);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="date-range">
            <DatePicker
              label="Returning"
              value={arrivalDateTime}
              onChange={(e) => {
                if (e != null)
                  setArrivalDateTime(e.format("YYYY-MM-DD[T00:00:00.000Z]"));
                else setArrivalDateTime(null);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
        {
          <Button
            variant="contained"
            className="newFlightButton"
            onClick={filterFlights}
          >
            Search Flights
          </Button>
        }
      </div>
    </div>
  );
};

export default Search;
