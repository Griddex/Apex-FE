import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  FETCH_UNITSETTINGS_FAILURE,
  FETCH_UNITSETTINGS_SUCCESS,
  UPDATE_SELECTEDVARIABLEUNITS,
  UPDATE_FIRSTLEVELUNITSETTINGS,
  UPDATE_UNITGROUPS,
} from "../Actions/UnitSettingsActions";
import unitSettingsState from "../State/UnitSettingsState";
import { IUnit } from "../State/UnitSettingsStateTypes";

const unitSettingsReducer = (state = unitSettingsState, action: IAction) => {
  switch (action.type) {
    case FETCH_UNITSETTINGS_SUCCESS: {
      const {
        status,
        unitsData: {
          dayFormat,
          monthFormat,
          yearFormat,
          unitGroup,
          variableUnits,
        },
      } = action.payload;

      return {
        ...state,
        dayFormat,
        monthFormat,
        yearFormat,
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

    case UPDATE_FIRSTLEVELUNITSETTINGS: {
      const { propertyName, propertyValue } = action.payload;

      return {
        ...state,
        [propertyName]: propertyValue,
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

    default:
      return state;
  }
};

export default unitSettingsReducer;
