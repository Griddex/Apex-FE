import React from "react";

export interface ICenteredStyle {
  children: React.ReactNode;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  height?: number | string;
  width?: number | string;
  justifyContent?:
    | "space-around"
    | "space-evenly"
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "center";
}

const CenteredStyle = ({
  children,
  flexDirection,
  height,
  width,
  justifyContent,
}: ICenteredStyle) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: flexDirection ? flexDirection : "row",
        alignItems: "center",
        justifyContent: justifyContent ? justifyContent : "center",
        width: width ? width : "100%",
        height: height ? height : "100%",
      }}
    >
      {children}
    </div>
  );
};

export default CenteredStyle;
