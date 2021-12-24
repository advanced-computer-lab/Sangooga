import React, { useState, useEffect } from "react";
import axios from "axios";
import Flights from "../Flights/Flights";
import Search from "../Search/Search";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./AdminFlights.css";

const AdminFlights = () => {
  return (
    <div>
      <div className="search-container">
        <Link to="/createFlight">
          <Button variant="contained" className="newFlightButton">
            Create New Flight
          </Button>
        </Link>
      </div>
      <Flights isAdmin={true} />
    </div>
  );
};

export default AdminFlights;
