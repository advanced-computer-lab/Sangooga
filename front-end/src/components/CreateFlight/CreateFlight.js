import React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import axios from "axios";

const CreateFlight = () => {
  const [flightNumber, setflightNumber] = useState(0);
  const [departureAirport, setdepartureAirport] = useState("");
  const [departureDateTime, setdepartureDateTime] = useState(new Date());
  const [arrivalAirport, setarrivalAirport] = useState("");
  const [arrivalDateTime, setarrivalDateTime] = useState(new Date());
  const [economySeats, seteconomySeats] = useState(0);
  const [economyPrice, seteconomyPrice] = useState(0);
  const [buisnessSeats, setbuisnessSeats] = useState(0);
  const [buisnessPrice, setbuisnessPrice] = useState(0);
  const [firstClassSeats, setfirstClassSeats] = useState(0);
  const [firstClassPrice, setfirstClassPrice] = useState(0);

  const [validFlight, setValidFlight] = useState(false);

  const createNewFlight = () => {
    if (true) {
      axios.post("http://localhost:5000/flight", {
        flightNumber: flightNumber,
        departureAirport: departureAirport,
        departureDateTime: departureDateTime,
        arrivalAirport: arrivalAirport,
        arrivalDateTime: arrivalDateTime,
        economySeats: economySeats,
        economyPrice: economyPrice,
        buisnessSeats: buisnessSeats,
        buisnessPrice: buisnessPrice,
        firstClassSeats: firstClassSeats,
        firstClassPrice: firstClassPrice,
      });
    }
  };
  return (
    <div>
      <form onSubmit={createNewFlight}>
        <Stack spacing={3}>
          <Stack spacing={2} direction="row">
            <TextField
              label="Flight Number"
              type="text"
              value={flightNumber}
              onChange={(e) => setflightNumber(e.target.value)}
            ></TextField>
            <TextField
              label="Departure Airport"
              placeholder="eg. CIA"
              type="text"
              value={departureAirport}
              onChange={(e) => setdepartureAirport(e.target.value)}
            ></TextField>
            <TextField
              label="Arrival Airport"
              placeholder="eg. BER"
              type="text"
              value={arrivalAirport}
              onChange={(e) => setarrivalAirport(e.target.value)}
            ></TextField>
          </Stack>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={2} direction="row">
              <DateTimePicker
                label="Departure Date & Time"
                value={departureDateTime}
                onChange={setdepartureDateTime}
                renderInput={(params) => <TextField {...params} />}
              ></DateTimePicker>
            </Stack>
            <Stack spacing={2} direction="row">
              <DateTimePicker
                label="Arrival Date & Time"
                value={arrivalDateTime}
                onChange={setarrivalDateTime}
                renderInput={(params) => <TextField {...params} />}
              ></DateTimePicker>
            </Stack>
          </LocalizationProvider>
          <Stack direction="row" spacing={1}>
            <Stack spacing={2}>
              <TextField
                label="# Economy Seats"
                type="number"
                value={economySeats}
                onChange={(e) => seteconomySeats(e.target.value)}
              ></TextField>
              <TextField
                label="Economy Seat Price"
                type="number"
                value={economyPrice}
                onChange={(e) => seteconomyPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
            <Stack spacing={2}>
              <TextField
                label="# Buisness Seats"
                type="number"
                value={buisnessSeats}
                onChange={(e) => setbuisnessSeats(e.target.value)}
              ></TextField>
              <TextField
                label="Buisness Seat Price"
                type="number"
                value={buisnessPrice}
                onChange={(e) => setbuisnessPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
            <Stack spacing={2}>
              <TextField
                label="# First-Class Seats"
                type="number"
                value={firstClassSeats}
                onChange={(e) => setfirstClassSeats(e.target.value)}
              ></TextField>
              <TextField
                label="First-Class Seat Price"
                type="number"
                value={firstClassPrice}
                onChange={(e) => setfirstClassPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
          </Stack>
          <Button type="submit">Create Flight</Button>
        </Stack>
      </form>
    </div>
  );
};

export default CreateFlight;
