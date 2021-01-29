import { IHTTPResponse } from "../../../Application/Layout/LayoutTypes";
import { IUnitSettingsData } from "./UnitSettingsStateTypes";

const unitSettingsState: Record<"unitSettingsData", IUnitSettingsData> &
  IHTTPResponse = {
  unitSettingsData: {
    pressureAddend: 14.7,
    dayFormat: "dd",
    monthFormat: "mm",
    yearFormat: "yyyy",
    unitGroup: "Field",
    variableUnits: [],
  },
  statusCode: 200,
  errors: { message: "" },
};

export default unitSettingsState;
