import { IHTTPResponse } from "../../../Application/Layout/LayoutTypes";
import { IUnitSettingsData } from "./UnitSettingsStateTypes";

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
  errors: { message: "" },
};

export default unitSettingsState;
