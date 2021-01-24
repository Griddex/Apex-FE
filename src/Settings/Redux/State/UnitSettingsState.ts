import { IHTTPResponse, IUnitSettingsData } from "./UnitSettingsStateTypes";

const unitSettingsState: Record<"unitSettingsData", IUnitSettingsData> &
  IHTTPResponse = {
  unitSettingsData: {
    dayFormat: "dd",
    monthFormat: "mm",
    yearFormat: "yyyy",
    unitGroup: "Field",
    units: [],
  },
  statusCode: 200,
  error: [],
};

export default unitSettingsState;
