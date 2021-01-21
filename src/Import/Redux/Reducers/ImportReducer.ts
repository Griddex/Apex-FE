import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_DEFINEDTABLEDATA,
  PERSIST_FILE,
  PERSIST_FILEHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_SELECTEDHEADERROWINDEX,
  PERSIST_TABLEDATA,
  PERSIST_TABLEHEADERS,
  PERSIST_TABLEROLENAMES,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
} from "../Actions/ImportActions";
import importState from "../State/ImportState";

const importReducer = (state = importState, action: IAction) => {
  switch (action.type) {
    case IMPORTFILE_INITIALIZATION:
    case PERSIST_FILE:
    case PERSIST_WORKSHEETNAMES:
    case PERSIST_WORKSHEET:
    case PERSIST_FILEHEADERS:
    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
    case PERSIST_CHOSENAPPLICATIONUNITS:
    case PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES:
    case PERSIST_CHOSENAPPLICATIONHEADERS:
    case PERSIST_SELECTEDHEADERROWINDEX:
    case PERSIST_FILEHEADERSMATCH:
    case PERSIST_FILEUNITSANDUNIQUEUNITS:
    case PERSIST_FILEUNITSMATCH:
    case PERSIST_TABLEROLENAMES:
    case PERSIST_TABLEDATA:
    case PERSIST_COLUMNNAMETABLEDATA:
    case PERSIST_DEFINEDTABLEDATA:
    case PERSIST_TABLEHEADERS: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        allWorkflows: {
          ...state.allWorkflows,
          [workflowProcessDefined]: {
            ...state.allWorkflows[workflowProcessDefined],
            ...action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default importReducer;
