import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  numberOfSeats,
  selectedClass,
}) => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [firstClassSeats, setFirstClassSeats] = useState([]);
  const [cabin, setCabin] = useState("FirstClassSeat");
  const [numberOfSeatsReserved, setNumberOfSeatsReserved] = useState(3);
  const reservation = JSON.parse(
    window.localStorage.getItem("editReservation")
  );
  const navigate = useNavigate();
  console.log(currentFlight);
  useEffect(() => {
    setNumberOfSeatsReserved(numberOfSeats);
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
      console.log("chosen seats:", chosenDepartureSeats);
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
  const editReservation = async () => {
    console.log(currentFlight);
    const edited = await axios.put(
      `http://localhost:5000/reservation/${reservation._id}`,
      { flight: currentFlight, seats: chosenDepartureSeats },
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    window.localStorage.removeItem("editReservation");
    navigate("/myreservations");
  };
  return (
    <div>
      {!reservation ? (
        !isReturnFlights ? (
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
        )
      ) : (
        <Button onClick={() => editReservation()}>
          Confirm Reservation Edit
        </Button>
      )}

      <Button size="small" onClick={() => setOpen(false)}>
        Go back
      </Button>
      {selectedClass == "economy_class" && (
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
      {selectedClass == "business_class" && (
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
      {selectedClass == "first_class" && (
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
