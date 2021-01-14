import { IUnitsData } from "../State/UnitSettingsState";

export const SAVE_UNITS = "SAVE_UNITS";

export const saveUnitsAction = (units: IUnitsData) => {
  return {
    type: SAVE_UNITS,
    payload: {
      units,
    },
  };
};
