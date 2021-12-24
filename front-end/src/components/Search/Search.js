import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputAdornment, Grid } from "@mui/material";
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

const Search = ({
  isAdmin,
  arrAirport,
  depAirport,
  depDateTime,
  arrDateTime,
  numfSeats,
  selClass,
}) => {
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
      const flights = await axios.post(
        "http://localhost:5000/flight/filter",
        {
          arrivalAirport,
          departureAirport,
          departureDateTime,
          arrivalDateTime,
          numberOfSeats,
          selectedClass,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );
      navigate("/flights", { state: flights.data });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <Grid container justifyContent="flex-start">
          <Grid item xs={2} sm={1} md={1}>
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
          </Grid>
          <Grid item xs={2} sm={2} md={1}>
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
          </Grid>
        </Grid>
      </div>

      <div className="searchBar">
        {/* <SearchIcon fontSize="large" /> */}
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
        <Grid justifyContent="flex-start" container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <LocalizationProvider
            dateAdapter={DateAdapter}
            sx={{ background: "white", borderRadius: 1 }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <div className="date-range">
                <DateTimePicker
                  label="Departing"
                  value={departureDateTime}
                  onChange={(e) =>
                    setDepartureDateTime(e.format("YYYY-MM-DD[T00:00:00.000Z]"))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="date-range">
                <DateTimePicker
                  label="Returning"
                  value={arrivalDateTime}
                  onChange={(e) =>
                    setArrivalDateTime(e.format("YYYY-MM-DD[T00:00:00.000Z]"))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </Grid>
          </LocalizationProvider>
          <Grid item xs={10} sm={12} md={12}>
            {
              <Button
                sx={{ py: 2, mr: -6 }}
                fullWidth
                variant="contained"
                className="newFlightButton"
                onClick={filterFlights}
              >
                Search Flights
              </Button>
            }
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Search;
