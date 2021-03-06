import { useState, React } from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LuggageIcon from "@mui/icons-material/Luggage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const CreateFlight = () => {
  const [flightNumber, setflightNumber] = useState(0);
  const [departureAirport, setdepartureAirport] = useState("");
  const [departureDateTime, setdepartureDateTime] = useState(new Date());
  const [arrivalAirport, setarrivalAirport] = useState("");
  const [arrivalDateTime, setarrivalDateTime] = useState(new Date());
  const [economySeats, seteconomySeats] = useState(0);
  const [economyPrice, seteconomyPrice] = useState(0);
  const [businessSeats, setbusinessSeats] = useState(0);
  const [businessPrice, setbusinessPrice] = useState(0);
  const [firstClassSeats, setfirstClassSeats] = useState(0);
  const [firstClassPrice, setfirstClassPrice] = useState(0);
  const [baggageAllowance, setBaggageAllowance] = useState(0);
  const [validFlight, setValidFlight] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const validateFlight = () => {
  //   if (
  //     /[^a-zA-Z]/.test(departureAirport) ||
  //     /[^a-zA-Z]/.test(arrivalAirport)
  //   ) {
  //     console.log("test1");
  //     setValidFlight(false);
  //     setErrorMessage("Airport names can only contain letters");
  //     console.log(errorMessage);
  //     return;
  //   }
  //   if (departureDateTime == null || arrivalDateTime == null) {
  //     console.log("test2");
  //     setValidFlight(false);
  //     setErrorMessage(
  //       "Arrival or Departure Time has to be in the correct format"
  //     );
  //     console.log(errorMessage);
  //     return;
  //   }
  //   if (arrivalDateTime < departureDateTime) {
  //     console.log("test3");
  //     setValidFlight(false);
  //     setErrorMessage("Arrival time has to be after Departure time");
  //     console.log(errorMessage);
  //     return;
  //   }
  // };

  const createNewFlight = async () => {
    if (
      /[^a-zA-Z]/.test(departureAirport) ||
      /[^a-zA-Z]/.test(arrivalAirport)
    ) {
      setValidFlight(false);
      setErrorMessage("Airport names can only contain letters");
      console.log(errorMessage);
      return;
    }
    if (departureDateTime == null || arrivalDateTime == null) {
      setValidFlight(false);
      setErrorMessage(
        "Arrival or Departure Time has to be in the correct format"
      );
      console.log(errorMessage);
      return;
    }
    if (arrivalDateTime < departureDateTime) {
      setValidFlight(false);
      setErrorMessage("Arrival time has to be after Departure time");
      console.log(errorMessage);
      return;
    }
    if (
      economySeats < 0 ||
      economyPrice < 0 ||
      businessSeats < 0 ||
      businessPrice < 0 ||
      firstClassSeats < 0 ||
      firstClassPrice < 0 ||
      baggageAllowance < 0
    ) {
      setValidFlight(false);
      setErrorMessage(
        "Seat numbers, seat prices, and baggage allowance have to be positive"
      );
      console.log(errorMessage);
      return;
    }
    if (validFlight) {
      const duration = Math.ceil(
        (arrivalDateTime - departureDateTime) / 1000 / 60 / 60
      );
      console.log(duration);
      const newFlight = {
        flightNumber: flightNumber,
        departureAirport: departureAirport,
        departureDateTime: departureDateTime,
        arrivalAirport: arrivalAirport,
        arrivalDateTime: arrivalDateTime,
        economySeats: economySeats,
        economyPrice: economyPrice,
        businessSeats: businessSeats,
        businessPrice: businessPrice,
        firstClassSeats: firstClassSeats,
        firstClassPrice: firstClassPrice,
        baggageAllowance: baggageAllowance,
        duration: duration,
      };
      await axios.post("http://localhost:5000/flight", newFlight, {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      });
      navigate("/home");
    }
  };
  return (
    <div>
      <form onSubmit={createNewFlight}>
        <Stack spacing={3}>
          <Stack spacing={2} direction="row">
            <TextField
              label="Flight Number"
              type="number"
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
                    <InputAdornment position="start">
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
            <Stack spacing={2}>
              <TextField
                label="# business Seats"
                type="number"
                value={businessSeats}
                onChange={(e) => setbusinessSeats(e.target.value)}
              ></TextField>
              <TextField
                label="business Seat Price"
                type="number"
                value={businessPrice}
                onChange={(e) => setbusinessPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </InputAdornment>
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
                    <InputAdornment position="start">
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
            <TextField
              label="Baggage Allowance"
              type="number"
              value={baggageAllowance}
              onChange={(e) => setBaggageAllowance(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LuggageIcon></LuggageIcon>
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
            ></TextField>
          </Stack>
          <Button type="submit">Create Flight</Button>
        </Stack>
      </form>
    </div>
  );
};

export default CreateFlight;
