import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ViewAirPlaneSeats from "./components/ViewAirPlaneSeats/ViewAirPlaneSeats";
import ViewAirPlaneSeatsForReturnFlights from "./components/ViewAirPlaneSeatsForReturnFlights/ViewAirPlaneSeatsForReturnFlights";

const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <Outlet /> : <Navigate to="/" />;
};
const App = () => {
  const [authenticated, setAuthenticated] = useState(
    window.localStorage.getItem("token")
  );
  return (
    <>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Routes>
        <Route
          path="/"
          element={<Login setAuthenticated={setAuthenticated} />}
        />

        <Route
          path="/home"
          element={<PrivateRoute authenticated={authenticated} />}
        >
          <Route path="/home" element={<Home />} />
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
      </Routes>
    </>
  );
};

export default App;
