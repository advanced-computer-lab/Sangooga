import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeletePopup = ({ flight, popupText }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [flightNumber, setFlightNumber] = useState(flight.flightNumber);
  const [departureAirPort, setDepartureAirPort] = useState(
    flight.departureAirport
  );
  const [departureDateTime, setDepartureDateTime] = useState(
    flight.departureDateTime
  );
  const [arrivalAirPort, setArrivalAirPort] = useState(flight.arrivalAirport);
  const [arrivalDateTime, setArrivalTime] = useState(flight.arrivalDateTime);
  const [economySeats, setEconomySeats] = useState(flight.economySeats);
  const [economyPrice, setEconomyPrice] = useState(flight.economyPrice);
  const [businessSeats, setBusinessSeats] = useState(flight.businessSeats);
  const [businessPrice, setBusinessPrice] = useState(flight.businessPrice);
  const [firstClassSeats, setFirstClassSeats] = useState(
    flight.firstClassSeats
  );
  const [firstClassPrice, setFirstClassPrice] = useState(
    flight.firstClassPrice
  );
  const navigate = useNavigate();
  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/flight/${id}`, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    navigate("/adminFlights");
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Delete
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
            Are you sure you want to delete the flight?
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            FlightNumber:
          </Typography>
          <Typography>{flightNumber}</Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Departure AirPort:
          </Typography>
          <Typography>{departureAirPort}</Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Departure Time:
          </Typography>
          <Typography>{departureDateTime}</Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Arrival AirPort:
          </Typography>
          <Typography>{arrivalAirPort}</Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Arrival Time:
          </Typography>
          <Typography>{arrivalDateTime}</Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Economy Class Seats:
          </Typography>
          <Typography>{economySeats}</Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Economy Class Price:
          </Typography>
          <Typography>{economyPrice}</Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Business Class Seats:
          </Typography>
          <Typography>{businessSeats}</Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Business Class Price:
          </Typography>
          <Typography>{businessPrice}</Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            First Class Seats:
          </Typography>
          <Typography>{firstClassSeats}</Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            First Class Price:
          </Typography>
          <Typography>{firstClassPrice}</Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              size="small"
              onClick={() => {
                onDelete(flight._id);
                handleClose();
              }}
            >
              Delete
            </Button>
            <Button size="small" onClick={handleClose}>
              Go back
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DeletePopup;
