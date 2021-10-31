import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';


const FlightCard = ({ flights, setFlights}) => {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const fetchFlights = async () =>{
  const result = await axios("http://localhost:5000/flight");
    setFlights(result.data);
}

const onDelete = async (id) =>{
  await axios.delete(`http://localhost:5000/flight/${id}`, {_id: id})
  fetchFlights();
}

  return (
    <div>
      <Grid container spacing={2}>
        {flights.map((flight) => (
          <Grid key={flight.flightNumber} item xs={3}>
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
                <Button size="small" onClick={handleOpen}>Delete</Button>
                <Modal
                    open={open}
                     onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete the flight?
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <Button size="small" onClick={() => {onDelete(flight._id)}}>Delete</Button>
                      <Button size="small" onClick={handleClose} >Go back</Button>
                      </Typography>
                    </Box>
                  </Modal>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default FlightCard;