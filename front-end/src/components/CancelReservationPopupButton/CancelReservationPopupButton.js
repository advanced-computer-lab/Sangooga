import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getSelectUtilityClasses, Stack } from "@mui/material";

const CancelReservationPopUpButton = ({ reservationId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reservation, setReservation] = useState();
  const [flight, setFlight] = useState();
  const [seats, setSeats] = useState();

  const getReservation = async () => {
    console.log("rid: ", reservationId);
    const chosenReservation = await axios.get(
      `http://localhost:5000/reservation/${reservationId}`,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log("cr", chosenReservation);
    const list = chosenReservation.data;
    console.log("list:", list);
    console.log(list[0]);
    setReservation(list[0]);
    console.log("r:", reservation);
  };

  const getFlight = () => {
    setFlight(reservation.flight);
  };
  const getSeats = () => {
    setSeats(reservation.seats);
  };

  useEffect(() => {
    // getReservation();
    // // getFlight();
    // // getSeats();
    // console.log(flight);
    // console.log(seats);
  }, []);

  const onDelete = async () => {
    await axios.delete(`http://localhost:5000/reservation/${reservationId}`, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
  };

  return (
    <div>
      <Button color="error" size="small" onClick={handleOpen}>
        Cancel Resrvation
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to canel your reservation?
          </Typography>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Reservation Number: {reservation.reservationNumber}
          </Typography> */}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Departure Airport: {flight.departureAirport}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Departure Time:{flight.departureDateTime}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Arrival Airport:{flight.arrivalAirport}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Arrival Time:{flight.arrivalDateTime}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Stack direction="row" spacing={1}>
              Reserved Seat(s):
              {seats.map((seat) => (
                <Typography variant="h7">{seat.seatNumber}</Typography>
              ))}
            </Stack>
          </Typography> */}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack spacing={1} direction="row">
              <Button
                size="small"
                color="error"
                onClick={() => {
                  onDelete();
                  handleClose();
                }}
              >
                Cancel Reservation
              </Button>
              <Button size="small" onClick={handleClose}>
                Go back
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelReservationPopUpButton;
