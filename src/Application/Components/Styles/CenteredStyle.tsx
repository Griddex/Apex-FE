import React from "react";

const CenteredStyle = ({
  children,
  flexDirection,
}: {
  children: React.ReactNode;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: flexDirection ? flexDirection : "row",
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
