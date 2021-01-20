import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  FETCH_UNITSETTINGS_FAILURE,
  FETCH_UNITSETTINGS_SUCCESS,
  UPDATE_CHOSENAPPUNIQUEUNITSETTINGSINDICES,
  UPDATE_FIRSTLEVELUNITSETTINGS,
  UPDATE_ALLUNITS,
} from "../Actions/UnitSettingsActions";
import unitSettingsState from "../State/UnitSettingsState";

const unitSettingsReducer = (state = unitSettingsState, action: IAction) => {
  switch (action.type) {
    case FETCH_UNITSETTINGS_SUCCESS: {
      const { statusCode, data } = action.payload;

      return {
        ...state,
        statusCode,
        data,
      };
    }

    case FETCH_UNITSETTINGS_FAILURE: {
      const { statusCode, error } = action.payload;

      return {
        ...state,
        statusCode,
        error,
      };
    }

    case UPDATE_CHOSENAPPUNIQUEUNITSETTINGSINDICES: {
      const { chosenAppUnitIndices } = action.payload;

      return {
        ...state,
        unitSettingsData: { chosenAppUnitIndices },
      };
    }

    case UPDATE_FIRSTLEVELUNITSETTINGS: {
      const { propertyName, propertyValue } = action.payload;

      return {
        ...state,
        [propertyName]: propertyValue,
      };
    }

    case UPDATE_ALLUNITS: {
      const { allUnits } = action.payload;

      return {
        ...state,
        allUnits,
      };
    }

    default:
      return state;
  }
};

export default unitSettingsReducer;
