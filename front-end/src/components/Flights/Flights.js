import React, { useState, useEffect } from "react";
import ChooseFlights from "../ChooseFlights/ChooseFlights";
import Search from "../Search/Search";
import "./Flights.css";
import { useLocation } from "react-router-dom";

const Flights = () => {
  const [choosenFlights, setChoosenFlights] = useState([]);
  const [isReturnFlights, setIsReturnFlights] = useState(false);
  const location = useLocation();
  const flights = location.state;

  return (
    <div>
      <ChooseFlights
        flights={flights}
        setChoosenFlights={setChoosenFlights}
        choosenFlights={choosenFlights}
        setIsReturnFlights={setIsReturnFlights}
        isReturnFlights={isReturnFlights}
      />
    </div>
  );
};

export default Flights;
