import React, { useState, useEffect } from "react";
import axios from "axios";
import Flight from "../Flights/Flight";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [flights, setFlights] = useState([[], []]);
  const [originalFlights, setOriginalFlights] = useState([]);
  const [choosenFlights, setChoosenFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState(false);

  const fetchFlights = async () => {
    const result = await axios.get("http://localhost:5000/flight", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    setFlights([[], []]);
    setOriginalFlights(result.data);
  };
  console.log(flights);
  useEffect(() => {
    fetchFlights();
  }, []);
  console.log(choosenFlights);

  const ChooseText = () => {
    if (flights === [])
      return (
        <div>
          <b>Choose Departing Flight</b>
        </div>
      );
    else return "";
  };

  return (
    <div>
      <div className="search-container">
        <Search
          className="searchFilters"
          setFlights={setFlights}
          originalFlights={originalFlights}
          isAdmin={false}
        />
      </div>
      <ChooseText />
      <Flight
        flights={returnFlights ? flights[1] : flights[0]}
        setChoosenFlights={setChoosenFlights}
        choosenFlights={choosenFlights}
        setReturnFlights={setReturnFlights}
        returnFlights={returnFlights}
      />
    </div>
  );
};

export default Home;
