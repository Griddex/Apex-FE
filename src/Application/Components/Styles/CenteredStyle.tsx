import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

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
  alignItems?:
    | "space-around"
    | "space-evenly"
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "center";
  moreStyles?: CSSProperties;
}

const CenteredStyle = React.forwardRef<HTMLDivElement, ICenteredStyle>(
  (
    {
      children,
      flexDirection,
      height,
      width,
      justifyContent,
      alignItems,
      moreStyles,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: flexDirection ? flexDirection : "row",
          alignItems: alignItems ? alignItems : "center",
          justifyContent: justifyContent ? justifyContent : "center",
          width: width ? width : "100%",
          height: height ? height : "100%",
          ...moreStyles,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default CenteredStyle;
