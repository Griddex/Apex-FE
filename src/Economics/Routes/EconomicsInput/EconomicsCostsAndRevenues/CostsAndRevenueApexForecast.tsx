import React from "react";
import { IInputWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import CostsAndRevenueManual from "./CostsAndRevenueManual";
import isEqual from "react-fast-compare";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export default function CostsAndRevenueApexForecast({
  wkCy,
  wkPs,
  finalAction,
}: IInputWorkflows) {
  const basePath = `${wkCy}.${wkPs}`;
  const reducer = "economicsReducer";

  const costsRevenuesSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wkCy][wkPs]["costsRevenues"],
    (data) => data
  );

  const costsRevenues = useSelector(costsRevenuesSelector);

  return (
    <CostsAndRevenueManual
      reducer={reducer}
      wkCy={wkCy}
      wkPs={wkPs}
      basePathStr={basePath}
      finalAction={finalAction}
      forecastEconomicsAggregated={costsRevenues}
    />
  );
}
