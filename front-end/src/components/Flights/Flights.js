import React, { useState, useEffect } from "react";
import ChooseFlights from "../ChooseFlights/ChooseFlights";
import Search from "../Search/Search";
import "./Flights.css";
import { useLocation } from "react-router-dom";

const Flights = (flightsReserved) => {
  const [choosenFlights, setChoosenFlights] = useState([]);
  const [isReturnFlights, setIsReturnFlights] = useState(false);
  const location = useLocation();
  //const flights = location.state;
  //const numberOfSelectedSeats = location.state[1];
  //const selectedClass = location.state[2];

  //console.log("flights in Flight component is", flights.data);
  //console.log("location.state[0]:", location.state[0]);
  //console.log(flights);

  const ChooseText = () => {
    if (flightsReserved === [])
      return (
        <div>
          <b>Choose Departing Flight</b>
        </div>
      );
    else return "";
  };

  return (
    <div>
      {/* <div className="search-container">
        <Search isAdmin={false} {...flights} />
      </div> */}
      <ChooseText />
      <ChooseFlights
        flights={flightsReserved}
        setChoosenFlights={setChoosenFlights}
        choosenFlights={choosenFlights}
        setIsReturnFlights={setIsReturnFlights}
        isReturnFlights={isReturnFlights}
        // numberOfSelectedSeats={numberOfSelectedSeats}
        // selectedClass={selectedClass}
      />
    </div>
  );
};

export default Flights;
