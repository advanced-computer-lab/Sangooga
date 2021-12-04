import React, { useState, useEffect } from "react";
import axios from "axios";
import Flight from "../Flights/Flight";
import Search from "../Search/Search";
import "./Home.css";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [originalFlights, setOriginalFlights] = useState([]);

  const fetchFlights = async () => {
    const result = await axios.get("http://localhost:5000/flight", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    setFlights(result.data);
    setOriginalFlights(result.data);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div>
      <div className="search-container">
        <Search
          className="searchFilters"
          setFlights={setFlights}
          originalFlights={originalFlights}
        />{" "}
      </div>{" "}
      <Flight flights={flights} setOriginalFlights={setOriginalFlights} />{" "}
    </div>
  );
};

export default AdminFlights;
