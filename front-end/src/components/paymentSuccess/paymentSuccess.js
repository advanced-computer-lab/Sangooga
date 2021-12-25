import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { unstable_composeClasses } from "@mui/material";
import axios from "axios";

const PaymentSuccess = () => {
  const [departureData, setDepartureData] = useState({});
  const [returnData, setReturnData] = useState({});
  const book = async () => {
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
  useEffect(() => {
    setDepartureData(window.localStorage.getItem("departureData")); //TODO: not working need to find out another way
    setReturnData(window.localStorage.getItem("returnData"));
    book();
    window.localStorage.removeItem("departureData");
    window.localStorage.removeItem("returnData");
  }, []);
  return (
    <div>
      <Paper></Paper>
    </div>
  );
};

export default PaymentSuccess;
