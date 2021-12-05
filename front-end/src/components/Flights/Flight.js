import Grid from "@mui/material/Grid";
import Card from "../Card/Card.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Flight = ({
  flights,
  setChoosenFlights,
  setReturnFlights,
  choosenFlights,
  returnFlights,
  isAdmin,
  flight,
  setOriginalFlights,
}) => {
  const navigate = useNavigate();

  const returnFlight = (flight) => {
    if (!returnFlights) {
      setChoosenFlights([...choosenFlights, flight]);
      setReturnFlights(true);
    } else {
      setChoosenFlights([...choosenFlights, flight]);
      navigate("/seats");
    }
  };
  return (
    <div>
      {returnFlights === true ? (
        <div>Available return flights:</div>
      ) : (
        <div>Departure Flights:</div>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {" "}
          {flights.map((flight) => (
            <Button onClick={() => returnFlight(flight)}>
              <Card
                key={flight.id}
                depTime={flight.departureDateTime.substring(11, 16)}
                arrTime={flight.arrivalDateTime.substring(11, 16)}
                duration={flight.duration}
                depAirport={flight.departureAirport}
                arrAirport={flight.arrivalAirport}
                isAdmin={isAdmin}
              />{" "}
            </Button>
          ))}{" "}
        </Grid>{" "}
      </Grid>{" "}
    </div>
  );
};
export default Flight;
