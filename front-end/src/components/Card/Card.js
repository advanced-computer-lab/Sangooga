import React from "react";
import "./Card.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const Card = ({
  depTime,
  arrTime,
  duration,
  depAirport,
  arrAirport,
  airportImage,
}) => {
  return (
    <div className="card">
      <div className="info">
        <img className="airport-image" src={airportImage} alt="airarabia" />
        <div className="airportNtime">
          <span className="time">{depTime} </span>
          <span className="airport gray">{depAirport}</span>
        </div>

        <div className="line-duration">
          <span className="duration gray">{duration}</span>

          <div className="connectContainer">
            <div className="connectLine gray-bg"></div>
            <AirplanemodeActiveIcon />
          </div>
        </div>

        <div className="airportNtime">
          <span className="time">{arrTime}</span>
          <span className="airport gray">{arrAirport}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
