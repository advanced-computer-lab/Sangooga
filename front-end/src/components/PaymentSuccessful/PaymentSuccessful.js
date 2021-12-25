import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Stack, Divider } from "@mui/material";
import { unstable_composeClasses } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./PaymentSuccessful.css";

const PaymentSuccessful = () => {
  // const location = useLocation();
  // console.log("location", location);
  // const departureData = location.state[0];
  // const returnData = location.state[1];
  const departureData = JSON.parse(
    window.localStorage.getItem("departureDataString")
  );
  const returnData = JSON.parse(
    window.localStorage.getItem("returnDataString")
  );
  // const [departureData, setDepartureData] = useState({});
  // const [returnData, setReturnData] = useState({});
  const book = async () => {
    console.log(
      "dep string",
      window.localStorage.getItem("departureDataString")
    );
    console.log(
      "return string",
      window.localStorage.getItem("returnDataString")
    );

    console.log(
      "dep object",
      JSON.parse(window.localStorage.getItem("departureDataString"))
    );
    console.log(
      "return obj",
      JSON.parse(window.localStorage.getItem("returnDataString"))
    );
    const departureReservationNumber = departureData.reservationNumber;
    const departureSeats = departureData.seats;
    const departureFlight = departureData.flight;
    const user = departureData.user;
    const departureReservation = await axios.post(
      "http://localhost:5000/reservation/",
      {
        reservationNumber: departureReservationNumber,
        user: user,
        flight: departureFlight,
        seats: departureSeats,
      },
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
    const returnReservationNumber = returnData.reservationNumber;
    const returnSeats = returnData.seats;
    const returnFlight = returnData.flight;
    const returnReservation = await axios.post(
      "http://localhost:5000/reservation/",
      {
        reservationNumber: returnReservationNumber,
        user: user,
        flight: returnFlight,
        seats: returnSeats,
      },
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
  };
  // const setStates = async () => {
  //   setDepartureData(
  //     JSON.parse(window.localStorage.getItem("departureDataString"))
  //   );
  //   setReturnData(JSON.parse(window.localStorage.getItem("returnDataString")));
  // };
  useEffect(async () => {
    // await setStates();
    console.log("dep state", departureData);
    console.log("ret state", returnData);
    book();
    window.localStorage.removeItem("departureData");
    window.localStorage.removeItem("returnData");
  }, []);
  return (
    <div>
      <Grid>
        <Paper
          className="successPaper"
          elevation={16}
          sx={{
            p: 6,
            width: "50%",
            height: "100%",
            mx: "auto",
            mb: 5,
          }}
        >
          <CheckCircleIcon
            sx={{ color: "green", fontSize: 40 }}
          ></CheckCircleIcon>
          <Typography variant="h3">Payment Successful</Typography>
          <Typography variant="h6">Have a safe flight</Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default PaymentSuccessful;
