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
import { NavLink } from "react-router-dom";

const Navbar = ({ authenticated, setAuthenticated, setUserData }) => {
  const logout = () => {
    window.localStorage.clear();
    setAuthenticated(false);
    setUserData([]);
  };
  const isAdmin = window.localStorage.getItem("userType") === "admin";

  return (
    <nav>
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
              <NavLink
                to="/adminflights"
                activeStyle={{ textDecoration: "underline", color: "red" }}
              >
                <Button color="inherit">Admin Flights</Button>
              </NavLink>
            )}
            <NavLink
              to="/"
              activeStyle={{ textDecoration: "underline", color: "red" }}
            >
              <Button color="inherit">Flights</Button>
            </NavLink>
            {authenticated && (
              <NavLink
                to="/profile"
                activeStyle={{ textDecoration: "underline", color: "red" }}
              >
                <Button color="inherit">Profile</Button>
              </NavLink>
            )}
            {authenticated && (
              <NavLink
                to="/myreservations"
                activeStyle={{ textDecoration: "underline", color: "red" }}
              >
                <Button color="inherit">My Reservations</Button>
              </NavLink>
            )}
            {authenticated ? ( //change link from "/login" to "/" once flights page is replaced with home page
              <NavLink
                to="/login"
                activeStyle={{ textDecoration: "underline", color: "red" }}
              >
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                activeStyle={{ textDecoration: "underline", color: "red" }}
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
};
export default Navbar;
