import React, { useState, useEffect } from "react";
import axios from "axios";
import Flight from "../Flights/Flight";
import Search from "../Search/Search";

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
      <Search setFlights={setFlights} originalFlights={originalFlights} />
      <Flight flights={flights} />
    </div>
  );
};

export default Home;
