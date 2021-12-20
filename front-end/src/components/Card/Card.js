import React from "react";
import "./Card.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import EditPopUp from "../../components/Popups/EditPopUp";
import Popup from "../../components/Popups/DeletePopUp";
import moment from "moment";

const Card = ({
  depTime,
  arrTime,
  duration,
  depAirport,
  arrAirport,
  isAdmin,
  setOriginalFlights,
  flight,
}) => {
  console.log(arrTime);
  return (
    <div>
      <div className="card">
        <div className="info">
          <img
            className="airport-image"
            src={
              "data:image/png;base64,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"
            }
            alt="airarabia"
          />
          <div className="airportNtime">
            <span className="time">
              {moment(depTime).format("DD/MM/YYYY")}{" "}
            </span>
            <span className="airport gray">{depAirport}</span>
          </div>

          <div className="line-duration">
            <span className="duration gray">{duration + " hr"} </span>

            <div className="connectContainer">
              <div className="connectLine gray-bg"></div>
              <AirplanemodeActiveIcon />
            </div>
          </div>

          <div className="airportNtime">
            <span className="time">{moment(arrTime).format("DD/MM/YYYY")}</span>
            <span className="airport gray">{arrAirport}</span>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div>
          <EditPopUp
            isAdmin={isAdmin}
            flight={flight}
            setOriginalFlights={setOriginalFlights}
          />{" "}
          <Popup
            isAdmin={isAdmin}
            flight={flight}
            setOriginalFlights={setOriginalFlights}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
