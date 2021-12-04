import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";

const ViewAirPlaneSeatsForReturnFlights = () => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const id = "61aa1a977157deb8f2949cd0";

    await axios
      .get(`http://localhost:5000/getSeats/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log("result is:", result);

        setEconomySeats(result.data.economySeatsArray);
        setBusinessSeats(result.data.businessSeatsArray);
        setFirstClassSeats(result.data.firstClassSeatsArray);

        console.log("economySeats is in the getSeats:", economySeats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChooseEconomySeat = async (id) => {
    const User = window.localStorage.getItem("token");
    console.log("User is:", User.username);
    console.log(jwt_decode(User));
    const DecodedToken = jwt_decode(User);
    const UserId = DecodedToken.user_id;
    console.log("UserID :", UserId);

    console.log("Chosen Seat ID is:", id);

    const newData = {
      id: id,
      userID: UserId,
    };
    const result = await axios.put(
      "http://localhost:5000/chooseEconomySeat",
      newData,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log("Result:", result.data);
  };

  const onChooseBusinessSeat = async (id) => {
    const User = window.localStorage.getItem("token");
    console.log("User is:", User.username);
    console.log(jwt_decode(User));
    const DecodedToken = jwt_decode(User);
    const UserId = DecodedToken.user_id;
    console.log("UserID :", UserId);

    console.log("Chosen Seat ID is:", id);
    const newData = {
      id: id,
      userID: UserId,
    };
    const result = await axios.put(
      "http://localhost:5000/chooseBusinessSeat",
      newData,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log("Result:", result.data);
  };

  const onChooseFirstClassSeat = async (id) => {
    const User = window.localStorage.getItem("token");
    console.log("User is:", User.username);
    console.log(jwt_decode(User));
    const DecodedToken = jwt_decode(User);
    const UserId = DecodedToken.user_id;
    console.log("UserID :", UserId);

    console.log("Chosen Seat ID is:", id);
    const newData = {
      id: id,
      userID: UserId,
    };
    const result = await axios.put(
      "http://localhost:5000/chooseFirstClassSeat",
      newData,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log("Result:", result.data);
  };

  console.log("economySeats is ouside the getSeats:", economySeats);

  return (
    <div>
      <div>
        {economySeats.map((economySeat) => {
          return (
            <button
              key={economySeat._id}
              onClick={() => {
                onChooseEconomySeat(economySeat._id);
              }}
            >
              Hi{economySeat.seatNumber}
            </button>
          );
        })}
      </div>
      <div>
        {businessSeats.map((businessSeat) => {
          return (
            <button
              key={businessSeat._id}
              onClick={() => {
                onChooseBusinessSeat(businessSeat._id);
              }}
            >
              Hi{businessSeat.seatNumber}
            </button>
          );
        })}
      </div>
      <div>
        {firstClassSeats.map((firstClassSeat) => {
          return (
            <button
              key={firstClassSeat._id}
              onClick={() => {
                onChooseFirstClassSeat(firstClassSeat._id);
              }}
            >
              Hi{firstClassSeat.seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAirPlaneSeatsForReturnFlights;
