import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const paymentSuccess = () => {
  const book = async () => {
    const departureReservation = await axios.post(
      "http://localhost:5000/reservation/",
      departureData,
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
    const returnReservation = await axios.post(
      "http://localhost:5000/reservation/",
      returnData,
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
  };
  useEffect(() => {
    const departureData = window.localStorage.getItem("departureData");
    const returnData = window.localStorage.getItem("returnData");
    book();
  }, []);
  return <div>
      <Paper></Paper>
  </div>;
};

export default paymentSuccess;
