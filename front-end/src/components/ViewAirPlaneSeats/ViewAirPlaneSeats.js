import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const ViewAirPlaneSeats = () => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);

  const [cabin, setCabin] = useState("EconomySeat");
  const [flightID, setFlightID] = useState("61ac9b67afaf637f9f127e21");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);
  const [chosenSeatsIDs, setChosenSeatsIDs] = useState([]);

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    await axios
      .get(`http://localhost:5000/flight/${flightID}`, {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log("result is:", result.data);
        const AllSeats = result.data.seats;
        console.log("AllSeats:", AllSeats);

        setEconomySeats(
          AllSeats.filter((economySeat) => economySeat.seatClass === "economy")
        );
        console.log("economy seats:", economySeats);

        setBusinessSeats(
          AllSeats.filter(
            (businessSeat) => businessSeat.seatClass === "business"
          )
        );
        console.log("business seats:", businessSeats);

        setFirstClassSeats(
          AllSeats.filter(
            (firstClassSeat) => firstClassSeat.seatClass === "first class"
          )
        );
        console.log("First Class Seat:", firstClassSeats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPickSeat = (id) => {
    if (numberOfSeatsReserved > 0) {
      setChosenSeatsIDs([...chosenSeatsIDs, id]);
      console.log("chosenSeatsIDs:", chosenSeatsIDs);
      setNumberOfSeatsReserved(numberOfSeatsReserved - 1);
      console.log("Number of seats left to reserve:", numberOfSeatsReserved);
    }
  };

  const onChooseSeat = async () => {
    const User = window.localStorage.getItem("token");
    const DecodedToken = jwt_decode(User);
    const UserId = DecodedToken.user_id;

    const newData = {
      seatIDs: chosenSeatsIDs,
      userID: UserId,
    };
    const result = await axios.put(
      "http://localhost:5000/chooseSeat",
      newData,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log("Result:", result.data);
  };

  return (
    <div>
      <button onClick={() => onChooseSeat()}>Confirm Reservations</button>
      {cabin == "EconomySeat" && (
        <div>
          {economySeats.map((economySeat) => {
            return (
              <div>
                {economySeat.seatStatus ? (
                  <button
                    key={economySeat._id}
                    onClick={() => {
                      onPickSeat(economySeat._id);
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
                {businessSeat.seatStatus ? (
                  <button
                    key={businessSeat._id}
                    onClick={() => {
                      onPickSeat(businessSeat._id);
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
                {firstClassSeat.seatStatus ? (
                  <button
                    key={firstClassSeat._id}
                    onClick={() => {
                      onPickSeat(firstClassSeat._id);
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
