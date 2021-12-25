import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ViewAirPlaneSeats = ({
  currentFlight,
  isReturnFlights,
  numberOfSeatsChosen,
  cabinChosen,
  setOpen,
  setIsReturnFlights,
  setChosenDepartureSeats,
  setChosenReturnSeats,
  chosenReturnSeats,
  chosenDepartureSeats,
  setChosenDepartureFlight,
  chosenDepartureFlight,
}) => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("FirstClassSeat");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);

  useEffect(() => {
    setEconomySeats(
      currentFlight.seats.filter(
        (economySeat) => economySeat.seatClass === "economy_class"
      )
    );

    setBusinessSeats(
      currentFlight.seats.filter(
        (businessSeat) => businessSeat.seatClass === "business_class"
      )
    );

    setFirstClassSeats(
      currentFlight.seats.filter(
        (firstClassSeat) => firstClassSeat.seatClass === "first_class"
      )
    );
  }, []);

  const onPickSeat = (seat) => {
    if (numberOfSeatsReserved > 0) {
      console.log(chosenDepartureSeats);
      if (!isReturnFlights) {
        setChosenDepartureSeats([...chosenDepartureSeats, seat]);
        console.log("chosenSeats:", chosenDepartureSeats);
        setNumberOfSeatsReserved(numberOfSeatsReserved - 1);
        console.log("Number of seats left to reserve:", numberOfSeatsReserved);
      } else {
        setNumberOfSeatsReserved(numberOfSeatsChosen); // only once
        setChosenReturnSeats([...chosenReturnSeats, seat]);
        console.log("chosenSeats:", chosenReturnSeats);
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
            setChosenDepartureFlight(currentFlight);
            setOpen(false);
            setIsReturnFlights(true);
          }}
        >
          Next
        </Button>
      ) : (
        <Link
          to="/reservationItinerary"
          state={[
            chosenDepartureSeats,
            chosenReturnSeats,
            chosenDepartureFlight,
            currentFlight,
          ]}
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
                      onPickSeat(economySeat);
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
                      onPickSeat(businessSeat);
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
                      onPickSeat(firstClassSeat);
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
