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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {flights.map((flight) => (
            <Button onClick={() => returnFlight(flight)}>
              <Card
                depTime={flight.departureDateTime}
                arrTime={flight.arrivalDateTime}
                duration={flight.duration}
                depAirport={flight.departureAirport}
                arrAirport={flight.arrivalAirport}
              />
            </Button>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default Flight;
