import React from "react";
import { TSingleMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const getInitialRowValueOrDefault = <T>(
  searchElement: string,
  returnElement: keyof TSingleMatchObject,
  matchCollection: TSingleMatchObject[],
  defaultValue: T
) => {
  const index = matchCollection.findIndex((o) => o.header === searchElement);
  if (index !== -1) return matchCollection[index][returnElement];
  else return defaultValue;
};

export default getInitialRowValueOrDefault;
