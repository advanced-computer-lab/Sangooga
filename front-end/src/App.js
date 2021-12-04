import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import AdminFlights from "./components/AdminFlights/AdminFlights";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import axios from "axios";
import "./App.css";
import Card from "./components/Card/Card";

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
            path="/card"
            element={
              <Card
                depTime="07:20"
                duration="1h"
                arrTime="08:20"
                depAirport="CAI"
                arrAirport="SSH"
                airportImage="https://www.ch-aviation.com/images/stockPhotos/7914/667a51621aabde7549b0bb24d9aac6330eb2de9e.jpg"
              />
            }
          >
            {" "}
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
