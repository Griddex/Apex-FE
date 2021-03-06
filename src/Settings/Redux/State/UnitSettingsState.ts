import { IHTTPResponse } from "../../../Application/Layout/LayoutTypes";
import { IUnitSettingsData } from "./UnitSettingsStateTypes";

const unitSettingsState: IUnitSettingsData & IHTTPResponse = {
  pressureAddend: 14.7,
  dayFormat: "dd",
  monthFormat: "MMM",
  yearFormat: "yyyy",
  unitGroup: "Field",
  variableUnits: [],
  variableNameUnitsMap: {},
  selectedVariableUnits: [],
  applicationUnitsCollection: [],

  appUnitsUnitGroupsMap: {},
  unitOptionsByVariableName: {},

  numberFormat: "number",
  numberFormatString: "0.0",

  errors: { message: "" },
};

export default unitSettingsState;
