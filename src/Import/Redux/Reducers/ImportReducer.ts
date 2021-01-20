import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_FILE,
  PERSIST_WORKSHEETNAMES,
  PERSIST_WORKSHEET,
  PERSIST_FILEHEADERS,
  PERSIST_SELECTEDHEADERROWINDEX,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEROLENAMES,
  PERSIST_TABLEDATA,
  PERSIST_DEFINEDTABLEDATA,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_TABLEHEADERS,
  IMPORT_EXCEL_LOADING,
  IMPORT_EXCEL_MATCHING,
  IMPORT_EXCELWORKSHEETNAME_SET,
  IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONUNITS,
} from "../Actions/ImportActions";

import importState from "../State/ImportState";

const importReducer = (state = importState, action: IAction) => {
  switch (action.type) {
    case IMPORTFILE_INITIALIZATION:
      return { ...state, ...action.payload };

    case PERSIST_FILE:
      return { ...state, ...action.payload };

    case PERSIST_WORKSHEETNAMES:
      return { ...state, ...action.payload };

    case PERSIST_WORKSHEET:
      return { ...state, ...action.payload };

    case PERSIST_FILEHEADERS:
      return { ...state, ...action.payload };

    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
      return { ...state, ...action.payload };
    case PERSIST_CHOSENAPPLICATIONUNITS:
      return { ...state, ...action.payload };

    case PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES:
      return { ...state, ...action.payload };

    case PERSIST_CHOSENAPPLICATIONHEADERS:
      return { ...state, ...action.payload };

    case PERSIST_SELECTEDHEADERROWINDEX:
      return { ...state, ...action.payload };

    case PERSIST_FILEHEADERSMATCH:
      return { ...state, ...action.payload };

    case PERSIST_FILEUNITSANDUNIQUEUNITS:
      return { ...state, ...action.payload };

    case PERSIST_FILEUNITSMATCH:
      return { ...state, ...action.payload };

    case PERSIST_TABLEROLENAMES:
      return { ...state, ...action.payload };

    case PERSIST_TABLEDATA:
      return { ...state, ...action.payload };

    case PERSIST_COLUMNNAMETABLEDATA:
      return { ...state, ...action.payload };

    case PERSIST_DEFINEDTABLEDATA:
      return { ...state, ...action.payload };

    case PERSIST_TABLEHEADERS:
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
    case LOGOUT_REQUEST:
      return { ...state, undefined };

    default:
      return state;
  }
};

export default importReducer;
