import React from "react";

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <h2 style={{ color: "#FAFAFA" }}>
        Welcome to the <b style={{ color: "#8FB2F5" }}> Weather App</b>
      </h2>
      <p style={{ color: "#BFBFD4" }}>
        Choose a location to see the weather forecast
      </p>
    </div>
  );
};

export default Welcome;
