import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeletePopup from "../Popups/DeletePopUp.js";

const FlightCard = ({ flights, setOriginalFlights }) => {
  return (
    <div>
      <Grid container spacing={2}>
        {flights.map((flight) => (
          <Grid key={flight._id} item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Flight Number: {flight.flightNumber}
                </Typography>
                <Typography variant="h6">Airport: {flight.airport}</Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Arrival: {flight.arrival}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Departure: {flight.departure}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Economy Seats: {flight.economySeats}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Business Seats: {flight.businessSeats}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <DeletePopup
                  flight={flight}
                  setOriginalFlights={setOriginalFlights}
                  popupText=" Are you sure you want to delete the flight?"
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default FlightCard;
