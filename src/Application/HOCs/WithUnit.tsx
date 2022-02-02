import React from "react";
import { useSelector } from "react-redux";
import {
  IUnit,
  IUnitsRow,
} from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { RootState } from "../Redux/Reducers/AllReducers";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

export interface IWithUnit {
  innerComponent: JSX.Element;
  unitValue: string;
}

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const variableNameUnitsMapSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.variableNameUnitsMap,
  (data) => data
);
const variableUnitsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.variableUnits,
  (data) => data
);

const WithUnit = ({ innerComponent, unitValue }: IWithUnit) => {
  const unitValueLower = unitValue?.toLowerCase();
  const isUnitValue =
    unitValueLower !== "select" && unitValueLower !== undefined;

  const InnerComponent = innerComponent as JSX.Element;

  const variableNameUnitsMap = useSelector(variableNameUnitsMapSelector);
  const variableUnits = useSelector(variableUnitsSelector);

  let displayUnitsObj = {} as IUnit;

  if (isUnitValue) {
    const displayUnitObj = (variableUnits as IUnitsRow[]).find(
      (o) => o.variableName === unitValue
    ) as IUnitsRow;

    const displayUnitsId = displayUnitObj?.displayUnitId as string;

    const unitsArr = variableNameUnitsMap[unitValue];

    displayUnitsObj = unitsArr?.find(
      (o) => o.unitId === displayUnitsId
    ) as IUnit;
  }

  return (
    <div style={{ display: "flex" }}>
      {InnerComponent}
      {unitValue === "payout" ? (
        <div style={{ alignSelf: "center", marginLeft: 5 }}>{`[months]`}</div>
      ) : (
        <div style={{ alignSelf: "center", marginLeft: 5 }}>{`[${
          isUnitValue ? displayUnitsObj?.title : "No unit"
        }]`}</div>
      )}
    </div>
  );
};

export default WithUnit;
