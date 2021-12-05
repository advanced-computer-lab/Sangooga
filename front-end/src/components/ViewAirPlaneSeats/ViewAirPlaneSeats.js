import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ViewAirPlaneSeats = () => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("EconomySeat");
  const [flightID, setFlightID] = useState("61ac9b67afaf637f9f127e21");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);
  const [chosenSeatsIDs, setChosenSeatsIDs] = useState([]);
  const location = useLocation();
  const { flights } = location.state;
  console.log(location.state);

  useEffect(() => {
    setEconomySeats(
      flights.filter((economySeat) => economySeat.seatClass === "economy")
    );
    console.log("economy seats:", economySeats);

    setBusinessSeats(
      flights.filter((businessSeat) => businessSeat.seatClass === "business")
    );
    console.log("business seats:", businessSeats);

    setFirstClassSeats(
      flights.filter(
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

  return (
    <div>
      <Link
        to="/ViewAirPlaneSeatsForReturnFlights/"
        state={(chosenSeatsIDs, flights[1])}
      >
        {" "}
        Next{" "}
      </Link>
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
