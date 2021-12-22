import Grid from "@mui/material/Grid";
import Card from "../Card/Card.js";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ViewAirPlaneSeats from "../ViewAirPlaneSeats/ViewAirPlaneSeats";

const ChooseFlights = ({
  flights,
  setChoosenFlights,
  setIsReturnFlights,
  choosenFlights,
  isReturnFlights,
  isAdmin,
  setOriginalFlights,
}) => {
  const [open, setOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState("");
  const [chosenDepartureSeatsIDs, setChosenDepartureSeatsIDs] = useState([]);
  const [chosenReturnSeatsIDs, setChosenReturnSeatsIDs] = useState([]);
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
                setOriginalFlights={setOriginalFlights}
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
              currentflight={currentFlight}
              isReturnFlights={isReturnFlights}
              setOpen={setOpen}
              setIsReturnFlights={setIsReturnFlights}
              setChosenDepartureSeatsIDs={setChosenDepartureSeatsIDs}
              chosenDepartureSeatsIDs={chosenDepartureSeatsIDs}
              chosenReturnSeatsIDs={chosenReturnSeatsIDs}
              setChosenReturnSeatsIDs={setChosenReturnSeatsIDs}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ChooseFlights;
