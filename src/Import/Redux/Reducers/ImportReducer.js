import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_FILE,
  PERSIST_WORKSHEETNAMES,
  PERSIST_WORKSHEET,
  PERSIST_SELECTEDWORKSHEET,
  PERSIST_WORKSHEETFORTABLE,
  IMPORT_EXCEL_LOADING,
  IMPORT_EXCEL_MATCHING,
  IMPORT_EXCELWORKSHEETNAME_SET,
  IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
} from "../Actions/ImportActions";

import importState from "./../State/ImportState";

const importReducer = (state = importState, action) => {
  const { skipped, /*errorSteps,*/ OptionalSteps } = state;

  switch (action.type) {
    case IMPORTFILE_INITIALIZATION:
      return { ...state, ...action.payload };

    case PERSIST_FILE:
      return { ...state, ...action.payload };

    case PERSIST_WORKSHEETNAMES:
      return { ...state, ...action.payload };

    case PERSIST_WORKSHEET:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDWORKSHEET:
      return { ...state, ...action.payload };

    case PERSIST_WORKSHEETFORTABLE:
      return { ...state, ...action.payload };

    case IMPORT_EXCEL_LOADING:
      return { ...state, Loading: action.payload.Loading };

    case IMPORT_EXCEL_MATCHING:
      return { ...state, Loading: action.payload.Matching };

    case IMPORT_EXCELWORKSHEETNAME_SET:
      return {
        ...state,
        selectedWorksheetName: action.payload.selectedWorksheetName,
      };
    case IMPORT_EXCELWORKSHEETPARSE_NAVIGATE:
      return {
        ...state,
        extrudeParseTable: action.payload.extrudeParseTable,
      };
    default:
      return state;
  }
};

export default importReducer;
