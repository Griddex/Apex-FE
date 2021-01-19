import { IUnitSettingsData } from "../State/UnitSettingsStateTypes";
import { DialogStuff } from "./../../../Application/Components/Dialogs/DialogTypes";
import { IUnitsRow } from "./../State/UnitSettingsStateTypes";

export const SAVE_UNITS = "SAVE_UNITS";
export const FETCH_UNITSETTINGS = "FETCH_UNITSETTINGS";
export const FETCH_UNITSETTINGS_SUCCESS = "FETCH_UNITSETTINGS_SUCCESS";
export const FETCH_UNITSETTINGS_FAILURE = "FETCH_UNITSETTINGS_FAILURE";
export const UPDATE_CHOSENAPPUNIQUEUNITSETTINGSINDICES =
  "UPDATE_CHOSENAPPUNIQUEUNITSETTINGSINDICES";
export const UPDATE_FIRSTLEVELUNITSETTINGS = "UPDATE_FIRSTLEVELUNITSETTINGS";
export const UPDATE_ALLUNITS = "UPDATE_ALLUNITS";

export const saveUnitsAction = (units: IUnitSettingsData) => {
  return {
    type: SAVE_UNITS,
    payload: {
      units,
    },
  };
};

export const fetchUnitSettingsAction = (
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: FETCH_UNITSETTINGS,
    payload: { successDialogParameters, failureDialogParameters },
    meta: { addAuth: true },
  };
};

export const fetchUnitSettingsSuccessAction = () => {
  return {
    type: FETCH_UNITSETTINGS_SUCCESS,
    payload: {
      statusCode: "",
      data: "",
    },
  };
};

export const fetchUnitSettingsFailureAction = () => {
  return {
    type: FETCH_UNITSETTINGS_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};

export const persistChosenAppUniqueUnitSettingsIndicesAction = (
  chosenAppUnitIndices: Record<string, number>
) => {
  return {
    type: UPDATE_CHOSENAPPUNIQUEUNITSETTINGSINDICES,
    payload: { chosenAppUnitIndices },
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

export const updateAllUnitsAction = (allUnits: IUnitsRow[]) => {
  return {
    type: UPDATE_ALLUNITS,
    payload: { allUnits },
  };
};
