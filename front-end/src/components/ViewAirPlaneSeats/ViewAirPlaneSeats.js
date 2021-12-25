import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ViewAirPlaneSeats = ({
  currentflight,
  isReturnFlights,
  numberOfSeatsChosen,
  cabinChosen,
  setOpen,
  setIsReturnFlights,
  setChosenDepartureSeatsIDs,
  setChosenReturnSeatsIDs,
  chosenReturnSeatsIDs,
  chosenDepartureSeatsIDs,
  // numberOfSelectedSeats,
  // selectedClass,
}) => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("FirstClassSeat");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);

  useEffect(() => {
    console.log("Current Flight is:", currentflight);
    setEconomySeats(
      currentflight.seats.filter(
        (economySeat) => economySeat.seatClass === "economy_class"
      )
    );

    setBusinessSeats(
      currentflight.seats.filter(
        (businessSeat) => businessSeat.seatClass === "business_class"
      )
    );

    setFirstClassSeats(
      currentflight.seats.filter(
        (firstClassSeat) => firstClassSeat.seatClass === "first_class"
      )
    );
  }, []);

  const onPickSeat = (id) => {
    if (numberOfSeatsReserved > 0) {
      if (!isReturnFlights) {
        setChosenDepartureSeatsIDs([...chosenDepartureSeatsIDs, id]);
        console.log("chosenSeatsIDs:", chosenDepartureSeatsIDs);
        setNumberOfSeatsReserved(numberOfSeatsReserved - 1);
        console.log("Number of seats left to reserve:", numberOfSeatsReserved);
      } else {
        setNumberOfSeatsReserved(numberOfSeatsChosen); // only once
        setChosenReturnSeatsIDs([...chosenReturnSeatsIDs, id]);
        console.log("chosenSeatsIDs:", chosenReturnSeatsIDs);
        setNumberOfSeatsReserved(numberOfSeatsReserved - 1);
        console.log("Number of seats left to reserve:", numberOfSeatsReserved);
      }
    }
  };

  return (
    <div>
      {!isReturnFlights ? (
        <Button
          onClick={() => {
            setOpen(false);
            setIsReturnFlights(true);
          }}
        >
          Next
        </Button>
      ) : (
        <Link
          to="/reservationItinerary"
          state={[chosenDepartureSeatsIDs, chosenReturnSeatsIDs]}
        >
          Confirm
        </Link>
      )}

      <Button size="small" onClick={() => setOpen(false)}>
        Go back
      </Button>
      {cabin == "EconomySeat" && (
        <div>
          {economySeats.map((economySeat) => {
            return (
              <div>
                {!economySeat.seatTaken ? (
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
                {!businessSeat.seatTaken ? (
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
                {!firstClassSeat.seatTaken ? (
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
