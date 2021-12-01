import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlightIcon from "@mui/icons-material/Flight";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ authenticated, setAuthenticated }) => {
  const logout = () => {
    window.localStorage.clear();
    setAuthenticated(false);
  };
  return (
    <Box className="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FlightIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flights
          </Typography>
          <Link to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link to="/home">
            <Button color="inherit">Flights</Button>
          </Link>
          {authenticated ? (
            <Link to="/">
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
