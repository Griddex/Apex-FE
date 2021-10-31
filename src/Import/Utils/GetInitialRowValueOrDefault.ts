import React from "react";
import { TSingleMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const getInitialRowValueOrDefault = <T>(
  searchElement: string,
  returnElement: keyof TSingleMatchObject,
  matchCollection: TSingleMatchObject[],
  defaultValue: T,
  key: string
) => {
  const index = matchCollection.findIndex((o: any) => o[key] === searchElement);
  if (index !== -1) return matchCollection[index][returnElement];
  else return defaultValue;
};

export default getInitialRowValueOrDefault;
