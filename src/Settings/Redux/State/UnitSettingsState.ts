import { IHTTPResponse } from "../../../Application/Layout/LayoutTypes";
import { IUnitSettingsData } from "./UnitSettingsStateTypes";

const unitSettingsState: IUnitSettingsData & IHTTPResponse = {
  pressureAddend: 14.7,
  dayFormat: "DD",
  monthFormat: "MMM",
  yearFormat: "yyyy",
  unitGroup: "Field",
  variableUnits: [],
  selectedVariableUnits: [],
  applicationUnitsCollection: [],

  uniqUnitOptions: [],

  status: 200,
  errors: { message: "" },
};

export default unitSettingsState;
