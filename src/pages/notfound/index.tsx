import React from "react";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#FF0000" }}>404</h1>
      <p style={{ fontSize: "24px" }}>Page Not Found</p>
    </div>
  );
};

export default NotFound;
