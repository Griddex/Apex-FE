import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";

interface IDateFormatter {
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  dateFormatterStyle?: CSSProperties;
}

const DateFormatter = ({
  dayFormat,
  monthFormat,
  yearFormat,
  dateFormatterStyle,
}: IDateFormatter) => {
  // Saturday, September 17, 2016
  const options: Record<string, string> = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // return date.toLocaleDateString("en-US", options);
  const date = new Date(2020, 6, 15);
  return (
    <div style={dateFormatterStyle}>
      {date.toLocaleString("en-US", options)}
    </div>
  );
};

export default DateFormatter;
