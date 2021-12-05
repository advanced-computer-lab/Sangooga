import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import ProfileEdit from "./components/Profile/ProfileEdit";

import axios from "axios";

const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <Outlet /> : <Navigate to="/" />;
};
const App = () => {
  const [authenticated, setAuthenticated] = useState(
    window.localStorage.getItem("token")
  );

  //console.log(decodedData.user_id);
  // const [userData, setUserData] = useState(null);
  // const [tokenData, setTokenData] = useState(userData);
  // const getTokenData = async (id) => {
  //   const result = axios.get(`http://localhost:5000/user/${id}`);
  //   setUserData(result);
  // };

  // useEffect(() => {
  //   getTokenData(decodedData.user_id);
  // }, [tokenData]);

  // console.log(tokenData);
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
    </>
  );
};

export default App;
