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
  uniqUnitOptions: [],

  numberFormat: "number",
  numberFormatString: "0.0",

  status: 200,
  errors: { message: "" },
};

export default unitSettingsState;
