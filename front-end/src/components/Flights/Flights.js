import React, { useState, useEffect } from "react";
import "./Flights.css";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "../Card/Card.js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ViewAirPlaneSeats from "../ViewAirPlaneSeats/ViewAirPlaneSeats";

const Flights = ({ isAdmin }) => {
  const [isReturnFlights, setIsReturnFlights] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState("");
  const [chosenDepartureSeats, setChosenDepartureSeats] = useState([]);
  const [chosenReturnSeats, setChosenReturnSeats] = useState([]);
  const [chosenDepartureFlight, setChosenDepartureFlight] = useState({});
  const location = useLocation();
  let flights = location.state;
  if (flights === null) {
    flights = [];
  }
  console.log(flights);
  return (
    <div>
      {isReturnFlights === true && !isAdmin && (
        <div>Available return flights:</div>
      )}
      {!isReturnFlights && !isAdmin && <div>Departure Flights:</div>}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {flights.map((flight) => (
            <Button
              key={flight.id}
              onClick={() => {
                if (!isAdmin) {
                  setCurrentFlight(flight);
                  setOpen(true);
                }
              }}
            >
              <Card
                key={flight.id}
                depTime={flight.departureDateTime}
                arrTime={flight.arrivalDateTime}
                duration={flight.duration}
                depAirport={flight.departureAirport}
                arrAirport={flight.arrivalAirport}
                isAdmin={isAdmin}
                flight={flight}
              />
            </Button>
          ))}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
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
            <ViewAirPlaneSeats
              currentFlight={currentFlight}
              isReturnFlights={isReturnFlights}
              setOpen={setOpen}
              setIsReturnFlights={setIsReturnFlights}
              setChosenDepartureSeats={setChosenDepartureSeats}
              chosenDepartureSeats={chosenDepartureSeats}
              chosenReturnSeats={chosenReturnSeats}
              setChosenReturnSeats={setChosenReturnSeats}
              chosenDepartureFlight={chosenDepartureFlight}
              setChosenDepartureFlight={setChosenDepartureFlight}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Flights;
