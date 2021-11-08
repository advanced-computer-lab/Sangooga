import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateFlight from "./components/CreateFlight/CreateFlight";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createFlight" element={<CreateFlight />} />
      </Routes>
    </>
  );
};

export default App;
