import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EditPopUp = ({ flight, setOriginalFlights, popupText }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [flightNumber, setFlightNumber] = React.useState();
  const [departureAirPort, setDepartureAirPort] = React.useState();
  const [departureDateTime, setDepartureDateTime] = React.useState();
  const [arrivalAirPort, setArrivalAirPort] = React.useState();
  const [arrivalTime, setArrivalTime] = React.useState();
  const [economySeats, setEconomySeats] = React.useState();
  const [economyPrice, setEconomyPrice] = React.useState();
  const [businessSeats, setBusinessSeats] = React.useState();
  const [businessPrice, setBusinessPrice] = React.useState();
  const [firstClassSeats, setFirstClassSeats] = React.useState();
  const [firstClassPrice, setFirstClassPrice] = React.useState();

  const fetchFlights = async () => {
    const result = await axios("http://localhost:5000/flight");
    setOriginalFlights(result.data);
  };

  const onEdit = async (id) => {
    console.log(id);
    const newData = {
      flightNumber: flightNumber,
      departureAirPort: departureAirPort,
      departureDateTime: departureDateTime,
      arrivalAirPort: arrivalAirPort,
      arrivalTime: arrivalTime,
      economySeats: economySeats,
      economyPrice: economyPrice,
      businessSeats: businessSeats,
      businessPrice: businessPrice,
      firstClassSeats: firstClassSeats,
      firstClassPrice: firstClassPrice,
    };

    await axios.put(`http://localhost:5000/flight/${id}`, newData);
    handleClose();
    fetchFlights();
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Edit
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
          <Box>
            <form>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to update the flight?
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                FlightNumber
              </Typography>
              <input
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="FlightNumber"
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Departure AirPort
              </Typography>
              <input
                onChange={(e) => setDepartureAirPort(e.target.value)}
                placeholder="AirPort"
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Departure Time
              </Typography>
              <input
                onChange={(e) => setDepartureDateTime(e.target.value)}
                placeholder="ArrivalTime"
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Arrival AirPort
              </Typography>
              <input
                onChange={(e) => setArrivalAirPort(e.target.value)}
                placeholder="DepartureTime"
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Arrival Time
              </Typography>
              <input
                onChange={(e) => setArrivalTime(e.target.value)}
                placeholder="EconomySeats"
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Economy Class Seats
              </Typography>
              <input
                onChange={(e) => setEconomySeats(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Economy Class Price
              </Typography>
              <input
                onChange={(e) => setEconomyPrice(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Business Class Seats
              </Typography>
              <input
                onChange={(e) => setBusinessSeats(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Business Class Price
              </Typography>
              <input
                onChange={(e) => setBusinessPrice(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                First Class Seats
              </Typography>
              <input
                onChange={(e) => setFirstClassSeats(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                First Class Price
              </Typography>
              <input
                onChange={(e) => setFirstClassPrice(e.target.value)}
                placeholder="BusinessSeats"
              ></input>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button
                  size="small"
                  onClick={() => {
                    onEdit(flight._id);
                    handleClose();
                  }}
                >
                  Update
                </Button>
                <Button size="small" onClick={handleClose}>
                  Go back
                </Button>
              </Typography>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditPopUp;
