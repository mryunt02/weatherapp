import React from "react";

const Infos = ({ info, about, children, isLine }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "10px",
        marginTop: "-18px",
        borderBottom: isLine ? "0.3px solid #BFBFD4" : "none",
      }}
    >
      <span className="material-symbols-outlined" style={{ color: "#BFBFD4" }}>
        {info}
      </span>
      <h5 style={{ color: "#BFBFD4", margin: "0 10px" }}>{about}</h5>
      <h4 style={{ color: "#FAFAFA", marginLeft: "auto", marginRight: "10px" }}>
        {children}
      </h4>
    </div>
  );
};

export default Infos;
