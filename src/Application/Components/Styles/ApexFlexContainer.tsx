import React from "react";
import { CSSProperties } from "react";

export interface IApexFlexContainer {
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
  className?: string;
  moreStyles?: CSSProperties;
}

const ApexFlexContainer = React.forwardRef<HTMLDivElement, IApexFlexContainer>(
  (
    {
      children,
      flexDirection,
      height,
      width,
      justifyContent,
      alignItems,
      className,
      moreStyles,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={className}
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

export default ApexFlexContainer;
