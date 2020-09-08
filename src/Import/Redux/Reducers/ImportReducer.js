import {
  IMPORT_EXCEL_LOADING,
  IMPORT_EXCEL_MATCHING,
  IMPORT_FILE_SAVE,
  IMPORT_EXCELWORKSHEETNAME_SET,
  IMPORT_EXCELWORKSHEETDATA_SET,
  IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
} from "../Actions/ImportAction";

import ImportState from "./../State/ImportState";

const importReducer = (state = ImportState, action) => {
  const { activeStep, steps, skipped, /*errorSteps,*/ OptionalSteps } = state;

  function isStepOptional(step) {
    return OptionalSteps.includes(step);
  }

  // function isStepFailed(step) {
  //   return errorSteps.includes(step);
  // }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  switch (action.type) {
    case IMPORT_EXCEL_LOADING:
      return { ...state, Loading: action.payload.Loading };
    case IMPORT_EXCEL_MATCHING:
      return { ...state, Loading: action.payload.Matching };
    case IMPORT_FILE_SAVE:
      return { ...state, AcceptedFile: action.payload.AcceptedFile };
    case IMPORT_EXCELWORKSHEETNAME_SET:
      return {
        ...state,
        SelectedWorksheetName: action.payload.SelectedWorksheetName,
      };
    case IMPORT_EXCELWORKSHEETDATA_SET:
      return {
        ...state,
        SelectedWorksheetData: action.payload.SelectedWorksheetData,
      };
    case IMPORT_EXCELWORKSHEETPARSE_NAVIGATE:
      return {
        ...state,
        ExtrudeParseTable: action.payload.ExtrudeParseTable,
      };
    default:
      return state;
  }
};

export default importReducer;
