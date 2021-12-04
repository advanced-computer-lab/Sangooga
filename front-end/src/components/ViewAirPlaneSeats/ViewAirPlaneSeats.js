import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";

const ViewAirPlaneSeats = () => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);

  const [cabin, setCabin] = useState("EconomySeat");

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const id = "61aba1d6ef6b902234dd0aca";
    const numberOfTickets = 2;
    const cabinType = "EconomySeat";

    setCabin(cabinType);

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
      {cabin == "EconomySeat" && (
        <div>
          {economySeats.map((economySeat) => {
            return (
              <div>
                {economySeat.available ? (
                  <button
                    key={economySeat._id}
                    onClick={() => {
                      onChooseEconomySeat(economySeat._id);
                    }}
                  >
                    EconomySeat {economySeat.seatNumber}
                  </button>
                ) : (
                  <button>Economy seat Taken</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {cabin == "BusinessSeat" && (
        <div>
          {businessSeats.map((businessSeat) => {
            return (
              <div>
                {businessSeat.available ? (
                  <button
                    key={businessSeat._id}
                    onClick={() => {
                      onChooseBusinessSeat(businessSeat._id);
                    }}
                  >
                    BusinessSeat {businessSeat.seatNumber}
                  </button>
                ) : (
                  <button>Business seat Taken</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {cabin == "FirstClassSeat" && (
        <div>
          {firstClassSeats.map((firstClassSeat) => {
            return (
              <div>
                {firstClassSeat.available ? (
                  <button
                    key={firstClassSeat._id}
                    onClick={() => {
                      onChooseFirstClassSeat(firstClassSeat._id);
                    }}
                  >
                    FirstClass {firstClassSeat.seatNumber}
                  </button>
                ) : (
                  <button>First Class Taken</button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewAirPlaneSeats;
