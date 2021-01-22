import { number } from "prop-types";
import { IHTTPResponse, IUnitSettingsData } from "./UnitSettingsStateTypes";

const unitSettingsState: Record<"unitSettingsData", IUnitSettingsData> &
  IHTTPResponse = {
  unitSettingsData: {
    dayFormat: "dd",
    monthFormat: "mm",
    yearFormat: "yyyy",
    globalUnitGroup: "Field",
    allUnits: [],
    chosenAppUnitIndices: [],
  },
  statusCode: 200,
  error: [],
};

export default unitSettingsState;
