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

const MyReservations = () => {
  const [Reservations, setReservations] = useState([]);
  //   const [showDeletePopup, setShowDeletePopup] = useState(false);
  const fetchReservations = async () => {
    const currentUserId = window.localStorage.getItem("userId");
    const results = await axios.get(
      `http://localhost:5000/reservation/user/${currentUserId}`,
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
    setReservations(results.data);
  };

  const getPrice = (reservation) => {
    let price = 0;
    reservation.seats.map((seat) => {
      price += seat.seatPrice;
    });
    return "$" + price;
  };

  //   const cancelReservation = async (reservation) => {
  //     const deletedReservation = await axios.delete(
  //       `http://localhost:5000/reservation/${reservation._id}`,
  //       {
  //         headers: { Authorization: window.localStorage.getItem("token") },
  //       }
  //     );
  //     setReservations(
  //       Reservations.filter((reservation) => reservation != deletedReservation)
  //     );
  //   };

  //   const showCancelPopup = () => {
  //     setShowDeletePopup(true);
  //   };

  useEffect(() => {
    fetchReservations();
  }, []);

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
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default MyReservations;
