import React from "react";
import { useSelector } from "react-redux";
import {
  IUnit,
  IUnitsRow,
} from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { RootState } from "../Redux/Reducers/AllReducers";

export interface IWithUnit {
  innerComponent: JSX.Element;
  unitValue: string;
}

const WithUnit = ({ innerComponent, unitValue }: IWithUnit) => {
  const unitValueLower = unitValue?.toLowerCase();
  const isUnitValue =
    unitValueLower !== "select" && unitValueLower !== undefined;
  console.log(
    "🚀 ~ file: WithUnit.tsx ~ line 15 ~ WithUnit ~ unitValue",
    unitValue
  );
  const InnerComponent = innerComponent as JSX.Element;

  const { variableNameUnitsMap, variableUnits } = useSelector(
    (state: RootState) => {
      const { variableNameUnitsMap, variableUnits } = state.unitSettingsReducer;
      return { variableNameUnitsMap, variableUnits };
    },
    () => true
  );

  let displayUnitsObj = {} as IUnit;

  if (isUnitValue) {
    const displayUnitObj = (variableUnits as IUnitsRow[]).find(
      (o) => o.variableName === unitValue
    ) as IUnitsRow;
    console.log(
      "🚀 ~ file: WithUnit.tsx ~ line 38 ~ WithUnit ~ displayUnitObj",
      displayUnitObj
    );

    const displayUnitsId = displayUnitObj?.displayUnitId as string;

    const unitsArr = variableNameUnitsMap[unitValue];

    displayUnitsObj = unitsArr?.find(
      (o) => o.unitId === displayUnitsId
    ) as IUnit;
  }

  return (
    <div style={{ display: "flex" }}>
      {InnerComponent}
      <div>{isUnitValue ? displayUnitsObj?.title : "No unit"}</div>
    </div>
  );
};

export default WithUnit;
