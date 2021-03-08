import { IUnitSettingsData } from "../State/UnitSettingsStateTypes";
import { IUnitsRow } from "./../State/UnitSettingsStateTypes";

export const SAVE_UNITS = "SAVE_UNITS";
export const FETCH_UNITSETTINGS_REQUEST = "FETCH_UNITSETTINGS_REQUEST";
export const FETCH_UNITSETTINGS_SUCCESS = "FETCH_UNITSETTINGS_SUCCESS";
export const FETCH_UNITSETTINGS_FAILURE = "FETCH_UNITSETTINGS_FAILURE";
export const UPDATE_FIRSTLEVELUNITSETTINGS = "UPDATE_FIRSTLEVELUNITSETTINGS";
export const UPDATE_ALLUNITS = "UPDATE_ALLUNITS";
export const UPDATE_UNITGROUPS = "UPDATE_UNITGROUPS";

export const saveUnitsAction = (units: IUnitSettingsData) => {
  return {
    type: SAVE_UNITS,
    payload: {
      units,
    },
  };
};

export const fetchUnitSettingsRequestAction = () => {
  return {
    type: FETCH_UNITSETTINGS_REQUEST,
    meta: { addAuth: true },
  };
};

export const fetchUnitSettingsSuccessAction = () => {
  return {
    type: FETCH_UNITSETTINGS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const fetchUnitSettingsFailureAction = () => {
  return {
    type: FETCH_UNITSETTINGS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const updateFirstLevelUnitSettingsAction = (
  propertyName: string,
  propertyValue: React.Key
) => {
  return {
    type: UPDATE_FIRSTLEVELUNITSETTINGS,
    payload: { propertyName, propertyValue },
  };
};

export const updateAllUnitsAction = (units: IUnitsRow[]) => {
  return {
    type: UPDATE_ALLUNITS,
    payload: { units },
  };
};

export const updateUnitGroupAction = (toUnitGroup: string) => {
  return {
    type: UPDATE_UNITGROUPS,
    payload: { toUnitGroup },
  };
};
