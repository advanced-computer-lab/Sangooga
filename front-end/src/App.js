import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import AdminFlights from "./components/AdminFlights/AdminFlights";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import ProfileEdit from "./components/Profile/ProfileEdit";
import axios from "axios";
import Home from "./components/Home/Home";
import MyReservations from "./components/MyReservations/MyReservations";
import "./App.css";

const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    const checkAuth = await axios.get("http://localhost:5000/checkAuth", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    console.log(checkAuth);
    setAuthenticated(checkAuth);
  }, []);

  return (
    <>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <div className="website">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/adminFlights"
            element={<PrivateRoute authenticated={authenticated} />}
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
    </>
  );
};

export default App;
