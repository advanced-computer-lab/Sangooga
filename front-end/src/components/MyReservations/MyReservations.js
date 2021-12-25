import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelReservationPopUpButton from "../CancelReservationPopupButton/CancelReservationPopupButton";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
  const navigate = useNavigate();

  const [Reservations, setReservations] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [res, setRes] = useState([]);

  const fetchReservations = async () => {
    const currentUserId = window.localStorage.getItem("userId");

    const results = await axios.get(
      `http://localhost:5000/reservation/user/${currentUserId}`,
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );

    setReservations(results.data);
    setRes(results.data);
  };

  const getPrice = (reservation) => {
    let price = 0;
    reservation.seats.map((seat) => {
      price += seat.seatPrice;
    });
    return "$" + price;
  };

  useEffect(() => {
    fetchReservations();
  }, []);
  const editReservation = async (reservation) => {
    console.log(reservation);
    window.localStorage.setItem("editReservation", JSON.stringify(reservation));
    let flights = await axios.post(
      "http://localhost:5000/flight/filter",
      {
        departureAirpot: reservation.flight.departureAirport,
        arrivalAirpot: reservation.flight.arrivalAirport,
      },
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log(reservation.flight.departureAirport);
    console.log(flights.data);
    navigate("/flights", { state: flights.data });
  };

  const showCancelPopup = () => {
    setShowDeletePopup(true);
  };

  return (
    <div>
      <Stack spacing={1}>
        {Reservations.map((reservation) => (
          <Card key={reservation._id}>
            <CardContent>
              <Typography variant="h6">
                {reservation.flight.flightNumber}
              </Typography>
              <Typography variant="h5">
                {reservation.flight.departureAirport} to{" "}
                {reservation.flight.arrivalAirport}
              </Typography>
              <Typography variant="h6">
                {reservation.flight.departureDateTime}
              </Typography>
              <Typography variant="h7">
                <Stack direction="row" spacing={1}>
                  Reserved Seat(s):
                  {reservation.seats.map((seat) => (
                    <Typography variant="h7">{seat.seatNumber}</Typography>
                  ))}
                </Stack>
              </Typography>
              <Typography variant="h6">
                Price: {getPrice(reservation)}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button
                variant="outlined"
                color="error"
                onClick={showCancelPopup}
              >
                Cancel Reservation
              </Button> */}

              <CancelReservationPopUpButton reservationId={reservation._id} />
              <Button
                onClick={() => {
                  editReservation(reservation);
                }}
              >
                Edit Rerservation
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default MyReservations;
