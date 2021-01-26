import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  FETCH_UNITSETTINGS_FAILURE,
  FETCH_UNITSETTINGS_SUCCESS,
  UPDATE_ALLUNITS,
  UPDATE_FIRSTLEVELUNITSETTINGS,
  UPDATE_UNITGROUPS,
} from "../Actions/UnitSettingsActions";
import unitSettingsState from "../State/UnitSettingsState";
import { IUnit } from "../State/UnitSettingsStateTypes";

const unitSettingsReducer = (state = unitSettingsState, action: IAction) => {
  switch (action.type) {
    case FETCH_UNITSETTINGS_SUCCESS: {
      const {
        statusCode,
        unitsData: { dayFormat, monthFormat, yearFormat, unitGroup, units },
      } = action.payload;

      return {
        ...state,
        unitSettingsData: {
          ...state.unitSettingsData,
          dayFormat,
          monthFormat,
          yearFormat,
          unitGroup,
          units,
        },
        statusCode,
      };
    }

    case FETCH_UNITSETTINGS_FAILURE: {
      const { statusCode, errors } = action.payload;

      return {
        ...state,
        statusCode,
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

    case UPDATE_ALLUNITS: {
      const { units } = action.payload;

      return {
        ...state,
        unitSettingsData: {
          ...state.unitSettingsData,
          units,
        },
      };
    }

    case UPDATE_UNITGROUPS: {
      const { toUnitGroup } = action.payload;
      const updatedUnits = state.unitSettingsData["units"].map((u) => {
        const units = u.units.map((un) => ({ ...un, group: toUnitGroup }));
        return units;
      });

      return {
        ...state,
        unitSettingsData: {
          ...state.unitSettingsData,
          units: updatedUnits,
        },
      };
    }

    default:
      return state;
  }
};

export default unitSettingsReducer;
