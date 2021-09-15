import React from "react";

const BadgeComingSoon = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
      }}
    >
      <div style={{ marginTop: 2 }}>Coming</div>
      <div>Soon</div>
    </div>
  );
};

export default BadgeComingSoon;
