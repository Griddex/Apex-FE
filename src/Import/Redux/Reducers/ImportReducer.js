import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_FILE,
  PERSIST_WORKSHEETNAMES,
  PERSIST_WORKSHEET,
  PERSIST_SELECTEDWORKSHEET,
  PERSIST_WORKSHEETFORTABLE,
  PERSIST_FILEHEADERS,
  PERSIST_SELECTEDHEADERROWINDEX,
  PERSIST_SELECTEDHEADEROPTIONINDEX,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITS,
  PERSIST_SELECTEDUNITROWINDEX,
  PERSIST_SELECTEDUNITOPTIONINDEX,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEROLESINDICES,
  PERSIST_TABLEDATA,
  IMPORT_EXCEL_LOADING,
  IMPORT_EXCEL_MATCHING,
  IMPORT_EXCELWORKSHEETNAME_SET,
  IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
} from "../Actions/ImportActions";

import importState from "./../State/ImportState";

const importReducer = (state = importState, action) => {
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

    case PERSIST_FILEHEADERS:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDHEADERROWINDEX:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDHEADEROPTIONINDEX:
      return { ...state, ...action.payload };

    case PERSIST_FILEHEADERSMATCH:
      return { ...state, ...action.payload };

    case PERSIST_FILEUNITS:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDUNITROWINDEX:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDUNITOPTIONINDEX:
      return { ...state, ...action.payload };

    case PERSIST_FILEUNITSMATCH:
      return { ...state, ...action.payload };

    case PERSIST_TABLEROLESINDICES:
      return { ...state, ...action.payload };

    case PERSIST_TABLEDATA:
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
