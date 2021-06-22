import set from "lodash.set";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  FETCH_UNITSETTINGS_FAILURE,
  FETCH_UNITSETTINGS_SUCCESS,
  UPDATE_SELECTEDVARIABLEUNITS,
  UPDATE_UNITGROUPS,
  UPDATE_UNITSETTINGS,
  RESET_UNITSETTINGS,
} from "../Actions/UnitSettingsActions";
import unitSettingsState from "../State/UnitSettingsState";

const unitSettingsReducer = (state = unitSettingsState, action: IAction) => {
  switch (action.type) {
    case UPDATE_UNITSETTINGS: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    //TODO Gift to ensure date format is saved
    //properly for use when a project loads
    case FETCH_UNITSETTINGS_SUCCESS: {
      const {
        status,
        unitsData: {
          // dayFormat,
          // monthFormat,
          // yearFormat,
          unitGroup,
          variableUnits,
        },
      } = action.payload;

      return {
        ...state,
        // dayFormat,
        // monthFormat,
        // yearFormat,
        unitGroup,
        variableUnits,
        status,
      };
    }

    case FETCH_UNITSETTINGS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case UPDATE_SELECTEDVARIABLEUNITS: {
      const { selectedVariableUnits } = action.payload;

      return {
        ...state,
        selectedVariableUnits,
      };
    }

    case UPDATE_UNITGROUPS: {
      const { toUnitGroup } = action.payload;
      const updatedUnits = state["variableUnits"].map((u) => {
        const units = u.units.map((un) => ({ ...un, group: toUnitGroup }));
        return units;
      });

      return {
        ...state,
        units: updatedUnits,
      };
    }

    case RESET_UNITSETTINGS: {
      return unitSettingsState;
    }

    default:
      return state;
  }
};

export default unitSettingsReducer;
