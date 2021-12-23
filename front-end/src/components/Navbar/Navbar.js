import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlightIcon from "@mui/icons-material/Flight";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = ({ authenticated, setAuthenticated }) => {
  const logout = () => {
    window.localStorage.clear();
    setAuthenticated(false);
  };
  const isAdmin = window.localStorage.getItem("userType") === "admin";

  return (
    <Box>
      <AppBar
        position="static"
        className="navbar"
        style={{ background: "white" }}
      >
        <Toolbar>
          <FlightIcon sx={{ color: "black" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Flights
          </Typography>
          {authenticated && isAdmin && (
            <Link to="/adminflights">
              <Button color="inherit">Admin Flights</Button>
            </Link>
          )}
          <Link to="/">
            <Button color="inherit">Flights</Button>
          </Link>
          {authenticated && (
            <Link to="/profile">
              <Button color="inherit">Profile</Button>
            </Link>
          )}
          {authenticated && (
            <Link to="/myreservations">
              <Button color="inherit">My Reservations</Button>
            </Link>
          )}
          {authenticated ? ( //change link from "/login" to "/" once flights page is replaced with home page
            <Link to="/login">
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
