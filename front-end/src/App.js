import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import AdminFlights from "./components/AdminFlights/AdminFlights";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ViewAirPlaneSeats from "./components/ViewAirPlaneSeats/ViewAirPlaneSeats";
import ViewAirPlaneSeatsForReturnFlights from "./components/ViewAirPlaneSeatsForReturnFlights/ViewAirPlaneSeatsForReturnFlights";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import ProfileEdit from "./components/Profile/ProfileEdit";
import MyReservations from "./components/MyReservations/MyReservations";
import "./App.css";
import Flight from "./components/Flights/Flight";
import Footer from "./components/Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

const PrivateRoute = ({ authenticated, loading }) => {
  return authenticated ? (
    <Outlet />
  ) : loading ? (
    <CircularProgress />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const checkAuth = await axios.get("http://localhost:5000/verifyToken", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    setAuthenticated(checkAuth);
    setLoading(false);
  }, []);
  console.log(loading);
  return (
    <>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight" element={<Flight />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />

          <Route
            path="/adminFlights"
            element={
              <PrivateRoute loading={loading} authenticated={authenticated} />
            }
          >
            <Route path="/adminFlights" element={<AdminFlights />} />
          </Route>

          <Route
            path="/createFlight"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route path="/createFlight" element={<CreateFlight />} />
          </Route>

          <Route
            path="/ViewAirPlaneSeats"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route path="/ViewAirPlaneSeats" element={<ViewAirPlaneSeats />} />
          </Route>

          <Route
            path="/ViewAirPlaneSeatsForReturnFlights"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route
              path="/ViewAirPlaneSeatsForReturnFlights"
              element={<ViewAirPlaneSeatsForReturnFlights />}
            />
          </Route>

          <Route
            path="/myreservations"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route path="/myreservations" element={<MyReservations />} />
          </Route>
          <Route
            path="/profile"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/profileEdit"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route path="/profileEdit" element={<ProfileEdit />} />
          </Route>

          <Route
            path="/register"
            element={<Register setAuthenticated={setAuthenticated} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
