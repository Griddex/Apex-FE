import { format } from "date-fns";

const formatDate = (
  date: Date,
  dayFormat: string,
  monthFormat: string,
  yearFormat: string
) => {
  try {
    if (date instanceof Date) {
      const formatString = `${dayFormat} ${monthFormat} ${yearFormat}`;
      return format(date, formatString);
    } else return "";
  } catch {
    return "";
  }
};

export default formatDate;
