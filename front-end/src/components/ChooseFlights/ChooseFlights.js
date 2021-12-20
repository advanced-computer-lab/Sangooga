import Grid from "@mui/material/Grid";
import Card from "../Card/Card.js";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ViewAirPlaneSeats from "../ViewAirPlaneSeats/ViewAirPlaneSeats";

const ChooseFlights = ({
  flights,
  setChoosenFlights,
  setReturnFlights,
  choosenFlights,
  returnFlights,
  isAdmin,
  setOriginalFlights,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentFlight, setCurrentFlight] = useState("");

  const returnFlight = (flight) => {
    setCurrentFlight(flight);
    handleOpen();
    // if (!returnFlights) {
    //   setChoosenFlights([...choosenFlights, flight]);
    //   setReturnFlights(true);
    // } else {
    //   navigate("/ViewAirPlaneSeats", { state: [...choosenFlights, flight] });
    // }
  };
  return (
    <div>
      {returnFlights === true && !isAdmin && (
        <div>Available return flights:</div>
      )}
      {!returnFlights && !isAdmin && <div>Departure Flights:</div>}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {flights.map((flight) => (
            <Button
              onClick={() => {
                if (!isAdmin) returnFlight(flight);
                handleOpen();
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
            <ViewAirPlaneSeats currentflight={currentFlight} />
            <Button
              size="small"
              onClick={() => {
                handleClose();
              }}
            >
              confirm
            </Button>
            <Button size="small" onClick={handleClose}>
              Go back
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ChooseFlights;
