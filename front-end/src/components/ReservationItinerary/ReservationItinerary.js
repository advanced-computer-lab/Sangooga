import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationItinerary = ({}) => {
  const navigate = useNavigate();
  const [departurePrice, setDeparturePrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [departureCabin, setDepartureCabin] = useState(0);
  const [returnCabin, setReturnCabin] = useState(0);
  const location = useLocation();
  console.log(location);
  const departureFlight = location.state[2];
  const departureSeats = location.state[0];
  const returnFlight = location.state[3];
  const returnSeats = location.state[1];

  const book = async () => {
    console.log("departure seats:", departureSeats);
    console.log("return seats:", returnSeats);
    console.log("random number isssssssssssss:", Math.random());
    const currentUserId = window.localStorage.getItem("userId");

    const departureData = {
      reservationNumber: Math.random() * 100000000000000000,
      seats: departureSeats,
      user: currentUserId,
      flight: departureFlight,
      departurePrice: departurePrice,
    };
    const returnData = {
      reservationNumber: Math.random() * 100000000000000000,
      seats: returnSeats,
      user: currentUserId,
      flight: returnFlight,
      returnPrice: returnPrice,
    };

    const checkoutSession = await axios.post(
      "http://localhost:5000/payment/createCheckoutSession",
      { departureData, returnData },
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );

    const departureDataString = JSON.stringify(departureData);
    const returnDataString = JSON.stringify(returnData);
    window.localStorage.setItem("departureDataString", departureDataString);
    window.localStorage.setItem("returnDataString", returnDataString);
    // navigate(checkoutSession.data.url, {
    //   state: [departureData, returnData],
    //   replace: true,
    // });
    window.location = checkoutSession.data.url;
  };

  const calculatePrices = () => {
    departureSeats.map((seat) => {
      setDeparturePrice(departurePrice + seat.seatPrice);
    });
    returnSeats.map((seat) => {
      setReturnPrice(returnPrice + seat.seatPrice);
    });
  };

  useEffect(() => {
    calculatePrices();
    console.log(departurePrice);
    console.log(returnPrice);
    setDepartureCabin(departureSeats[0].seatClass.split("_").join(" "));
    setReturnCabin(returnSeats[0].seatClass.split("_").join(" "));
  }, []);
  return (
    <div>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h3"> Confirm your Booking:</Typography>
            <Typography variant="h5">Departure Trip:</Typography>
            <Typography variant="h6">
              {departureFlight.departureAirport} to{" "}
              {departureFlight.arrivalAirport}
            </Typography>
            <Typography variant="h7">
              Leaves: {departureFlight.departureDateTime}
            </Typography>
            <Typography variant="h7">
              Arrives: {departureFlight.arrivalDateTime}
            </Typography>
            <Typography variant="h7"></Typography>
            <Typography variant="h7">Cabin: {departureCabin}</Typography>
            <Typography variant="h7">
              <Grid spacing={3}>
                Seat(s):{" "}
                {departureSeats.map((seat) => {
                  return <span>{seat.seatNumber} </span>;
                })}
              </Grid>
            </Typography>
            <Typography variant="h7">Price: ${departurePrice}</Typography>
            <Divider />
            <Typography variant="h5">Return Trip:</Typography>
            <Typography variant="h6">
              {returnFlight.departureAirport} to
              {returnFlight.arrivalAirport}
            </Typography>
            <Typography variant="h7">
              Leaves: {returnFlight.departureDateTime}
            </Typography>
            <Typography variant="h7">
              Arrives: {returnFlight.arrivalDateTime}
            </Typography>
            <Typography variant="h7"></Typography>
            <Typography variant="h7">Cabin: {returnCabin}</Typography>
            <Typography variant="h7">
              <Grid spacing={3}>
                Seat(s):{" "}
                {returnSeats.map((seat) => {
                  return <span>{seat.seatNumber} </span>;
                })}
              </Grid>
            </Typography>
            <Typography variant="h7">Price: ${returnPrice}</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={book}>Confirm Booking</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ReservationItinerary;
