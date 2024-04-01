import React from "react";
import icon from "../icons/01d.png";
import { icons } from "./icons";
const Forecast = ({ day, iconNo, tempMax, tempMin }) => {
  return (
    <div>
      <h3 style={{ marginTop: "20px", color: "#BFBFD4" }}>{day}</h3>
      <img
        src={icons[iconNo[0]] || icon}
        alt=""
        style={{ width: "60px", marginBottom: "-10px", marginTop: "-10px" }}
      />
      <h4 style={{ marginTop: "10px", color: "#FAFAFA" }}>{tempMax}°C</h4>
      <h4 style={{ marginTop: "-20px", color: "#7F7F98" }}>{tempMin}C</h4>
    </div>
  );
};

export default Forecast;
