import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import AdminFlights from "./components/AdminFlights/AdminFlights";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ViewAirPlaneSeats from "./components/ViewAirPlaneSeats/ViewAirPlaneSeats";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileEditPass from "./components/Profile/ProfileEditPass";
import ProfileSetting from "./components/Profile/ProfileSetting";
import MyReservations from "./components/MyReservations/MyReservations";
import "./App.css";
import Flights from "./components/Flights/Flights";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import ReservationItinerary from "./components/ReservationItinerary/ReservationItinerary";
import Search from "./components/Search/Search";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";
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

  const [userData, setUserData] = useState([]);

  console.log(userData);
  return (
    <>
      <div className="pageWrapper">
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setUserData={setUserData}
        />
        <div className="contentWrapper">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search isAdmin={false} />

                  <Home />
                </>
              }
            />
            <Route
              path="/flights"
              element={
                <>
                  <Search isAdmin={false} />

                  <Flights />
                </>
              }
            />
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
              <Route
                path="/adminFlights"
                element={
                  <>
                    <Search isAdmin={true} />
                    <AdminFlights />
                  </>
                }
              />
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
              path="/paymentSuccess"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            </Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  loading={loading}
                  authenticated={authenticated}
                  userData={userData}
                  setUserData={setUserData}
                />
              }
            >
              <Route
                path="/profile"
                element={
                  <Profile userData={userData} setUserData={setUserData} />
                }
              />
            </Route>
            <Route
              path="/profileEdit"
              element={
                <PrivateRoute
                  loading={loading}
                  authenticated={authenticated}
                  userData={userData}
                  setUserData={setUserData}
                />
              }
            >
              <Route
                path="/profileEdit"
                element={
                  <ProfileEdit userData={userData} setUserData={setUserData} />
                }
              />
            </Route>
            <Route
              path="/profileEditPass"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route
                path="/profileEditPass"
                element={<ProfileEditPass userData={userData} />}
              />
            </Route>
            <Route
              path="/profileSetting"
              element={
                <PrivateRoute loading={loading} authenticated={authenticated} />
              }
            >
              <Route
                path="/profileSetting"
                element={<ProfileSetting userData={userData} />}
              />
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
