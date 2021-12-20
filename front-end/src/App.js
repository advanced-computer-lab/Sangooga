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
import Flights from "./components/Flights/Flights";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import ReservationItinerary from "./components/ReservationItinerary/ReservationItinerary";

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
    await axios
      .get("http://localhost:5000/verifyToken", {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAuthenticated(true);
      })
      .catch((res) => {
        setAuthenticated(false);
        window.localStorage.clear();
      });
    setLoading(false);
  }, []);

  return (
    <>
      <div className="pageWrapper">
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <div className="contentWrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
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
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route path="/createFlight" element={<CreateFlight />} />
            </Route>

            <Route
              path="/ViewAirPlaneSeats"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route
                path="/ViewAirPlaneSeats"
                element={<ViewAirPlaneSeats />}
              />
            </Route>

            <Route
              path="/ViewAirPlaneSeatsForReturnFlights"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route
                path="/ViewAirPlaneSeatsForReturnFlights"
                element={<ViewAirPlaneSeatsForReturnFlights />}
              />
            </Route>

            <Route
              path="/myreservations"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route path="/myreservations" element={<MyReservations />} />
            </Route>
            <Route
              path="/reservationItinerary"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route
                path="/reservationItinerary"
                element={<ReservationItinerary />}
              />
            </Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route
              path="/profileEdit"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
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
      </div>
    </>
  );
};

export default App;
