import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { format } from "date-fns";
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
  const date = new Date();
  const formatString = `${dayFormat} ${monthFormat} ${yearFormat}`;

  return <div style={dateFormatterStyle}>{format(date, formatString)}</div>;
};

export default DateFormatter;
