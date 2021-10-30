import React,{ useState,useEffect } from "react";
import axios from "axios";
import Flight from "../Flights/Flight";
import Search from "../Search/Search";

export let originalFlights = [];

const Home = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    async function getFlights(){
    const result = await axios("http://localhost:5000/flight");
    originalFlights = result.data;
    setFlights(result.data);
  }
    getFlights();
  },[]);
  // const [filterdFlights, filtFlights] = useState([]);

  return (
    <div>
      <Search setFlights = {setFlights}/>
      <Flight flights ={flights} />
    </div>
  );
};



export default Home;
