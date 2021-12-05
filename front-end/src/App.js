import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import AdminFlights from "./components/AdminFlights/AdminFlights";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import axios from "axios";
import "./App.css";
import Flight from "./components/Flights/Flight";
import Footer from "./components/Footer/Footer";
const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    const checkAuth = await axios.get("http://localhost:5000/verifyToken", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    setAuthenticated(checkAuth);
  }, []);

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
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
