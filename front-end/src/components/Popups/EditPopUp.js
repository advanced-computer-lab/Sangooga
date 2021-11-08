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
      arrivalDateTime: arrivalDateTime,
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
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Departure AirPort
              </Typography>
              <input
                value={departureAirPort}
                onChange={(e) => setDepartureAirPort(e.target.value)}
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Departure Time
              </Typography>
              <input
                value={departureDateTime}
                onChange={(e) => setDepartureDateTime(e.target.value)}
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Arrival AirPort
              </Typography>
              <input
                value={arrivalAirPort}
                onChange={(e) => setArrivalAirPort(e.target.value)}
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Arrival Time
              </Typography>
              <input
                value={arrivalDateTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              ></input>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Economy Class Seats
              </Typography>
              <input
                value={economySeats}
                onChange={(e) => setEconomySeats(e.target.value)}
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Economy Class Price
              </Typography>
              <input
                value={economyPrice}
                onChange={(e) => setEconomyPrice(e.target.value)}
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Business Class Seats
              </Typography>
              <input
                value={businessSeats}
                onChange={(e) => setBusinessSeats(e.target.value)}
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Business Class Price
              </Typography>
              <input
                value={businessPrice}
                onChange={(e) => setBusinessPrice(e.target.value)}
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                First Class Seats
              </Typography>
              <input
                value={firstClassSeats}
                onChange={(e) => setFirstClassSeats(e.target.value)}
              ></input>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                First Class Price
              </Typography>
              <input
                value={firstClassPrice}
                onChange={(e) => setFirstClassPrice(e.target.value)}
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
