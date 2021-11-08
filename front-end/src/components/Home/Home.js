import React, { useState, useEffect } from "react";
import axios from "axios";
import Flight from "../Flights/Flight";
import Search from "../Search/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [originalFlights, setOriginalFlights] = useState([]);

  const fetchFlights = async () => {
    const result = await axios("http://localhost:5000/flight");
    setFlights(result.data);
    setOriginalFlights(result.data);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Search setFlights={setFlights} originalFlights={originalFlights} />
        <Link to="/createFlight">
          <Button variant="contained">Create New Flight</Button>
        </Link>
      </Stack>
      <Flight flights={flights} setOriginalFlights={setOriginalFlights} />
    </div>
  );
};

export default Home;
