import React from "react";

const CenteredStyle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default CenteredStyle;
