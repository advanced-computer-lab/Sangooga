import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ViewAirPlaneSeats = (currentflight) => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("FirstClassSeat");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);
  const [chosenSeatsIDs, setChosenSeatsIDs] = useState([]);
  //const location = useLocation();
  //const flights = location.state[0];

  useEffect(() => {
    console.log("Current Flight is:", currentflight);
    console.log(
      "Current Flight CurrentFlight is:",
      currentflight.currentflight
    );
    console.log(
      "Current Flight CurrentFlight Seats is:",
      currentflight.currentflight.seats
    );

    setEconomySeats(
      currentflight.currentflight.seats.filter(
        (economySeat) => economySeat.seatClass === "economy_class"
      )
    );
    console.log("economy seats:", economySeats);

    setBusinessSeats(
      currentflight.currentflight.seats.filter(
        (businessSeat) => businessSeat.seatClass === "business_class"
      )
    );
    console.log("business seats:", businessSeats);

    setFirstClassSeats(
      currentflight.currentflight.seats.filter(
        (firstClassSeat) => firstClassSeat.seatClass === "first_class"
      )
    );
    console.log("first seats:", firstClassSeats);
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
      {/* <Link
        to="/ViewAirPlaneSeatsForReturnFlights/"
        state={[chosenSeatsIDs, location.state[0], location.state[1]]}
      >
        Next
      </Link> */}
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
