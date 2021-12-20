import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ViewAirPlaneSeatsForReturnFlights = () => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("BusinessSeat");
  const [flightID, setFlightID] = useState("61ac9b67afaf637f9f127e21");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);
  const [chosenSeatsIDs, setChosenSeatsIDs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const flights = location.state[1];
  const chosenSeatsIDs1 = location.state[0];
  const fullData = location.state;

  useEffect(() => {
    setEconomySeats(
      flights.seats.filter((economySeat) => economySeat.seatClass === "economy")
    );

    setBusinessSeats(
      flights.seats.filter(
        (businessSeat) => businessSeat.seatClass === "business"
      )
    );

    setFirstClassSeats(
      flights.seats.filter(
        (firstClassSeat) => firstClassSeat.seatClass === "first class"
      )
    );
  }, []);

  const onPickSeat = (id) => {
    if (numberOfSeatsReserved > 0) {
      setChosenSeatsIDs([...chosenSeatsIDs, id]);
      console.log("chosenSeatsIDs:", chosenSeatsIDs);
      setNumberOfSeatsReserved(numberOfSeatsReserved - 1);
      console.log("Number of seats left to reserve:", numberOfSeatsReserved);
    }
  };

  const onChooseSeat = async () => {
    try {
      const newData = {
        seatIDs: { chosenSeatsIDs1, chosenSeatsIDs },
      };

      // await axios.put("http://localhost:5000/chooseSeat", newData);

      navigate("/reservationItinerary", {
        state: { fullData, chosenSeatsIDs },
      });
    } catch (err) {
      console.log(err);
    }
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

export default ViewAirPlaneSeatsForReturnFlights;
