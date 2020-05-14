import { IMPORT_EXCEL_LOADING } from "../Actions/ImportLoadingAction";
import { IMPORT_CONTEXTDRAWER_SET } from "../Actions/SetContextDrawerContentAction";
import {
  IMPORT_STEPPERSTEPFAILED_SET,
  IMPORT_STEPPERSTEPSKIPPED_SET,
  IMPORT_STEPPERSTEPSACTIVESTEPS_SET,
} from "../Actions/SetStepperActions";
import ImportState from "./../State/ImportState";

export const ImportReducer = (state = ImportState, action) => {
  switch (action.type) {
    case IMPORT_EXCEL_LOADING:
      return { ...state, Loading: action.payload.Loading };
    case IMPORT_CONTEXTDRAWER_SET:
      return {
        ...state,
        contextDrawerContentTrigger: action.payload.contextDrawerContentTrigger,
      };
    case IMPORT_STEPPERSTEPFAILED_SET:
      return {
        ...state,
        IsStepFailed: action.payload.IsStepFailed,
      };
    case IMPORT_STEPPERSTEPSKIPPED_SET:
      return {
        ...state,
        IsStepSkipped: action.payload.IsStepSkipped,
      };
    case IMPORT_STEPPERSTEPSACTIVESTEPS_SET:
      return {
        ...state,
        Steps: action.payload.Steps,
        ActiveStep: action.payload.ActiveStep,
      };
    default:
      return state;
  }
};
