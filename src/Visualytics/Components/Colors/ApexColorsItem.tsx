import React from "react";

export interface IApexColorsItem {
  id: string;
  colors: string[];
}

const ApexColorsItem = ({ id, colors }: IApexColorsItem) => {
  return (
    <div>
      <div
        style={{
          fontWeight: 500,
          fontSize: "0.8rem",
          marginRight: 14,
          width: 130,
        }}
      >
        {id}
      </div>
      {colors.map((color) => (
        <div
          key={color}
          style={{ display: "block", width: 12, height: 12, background: color }}
        />
      ))}
    </div>
  );
};

export default ApexColorsItem;
