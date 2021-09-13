import { CSSProperties } from "@material-ui/styles";
import React from "react";

export interface ICustomTooltip {
  firstWord: string;
  secondWord: string;
  secondWordStyle?: CSSProperties;
}

const CustomTooltip = ({
  firstWord,
  secondWord,
  secondWordStyle,
}: ICustomTooltip) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 2,
      }}
    >
      <span>{firstWord}</span>
      <span style={secondWordStyle}>{secondWord}</span>
    </div>
  );
};

export default CustomTooltip;
