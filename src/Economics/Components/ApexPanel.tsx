import React, { HTMLAttributes } from "react";

export interface IApexPanel {
  children: JSX.Element | string;
  value: number;
  index: number;
  className?: string;
}

export default function ApexPanel(props: IApexPanel) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
