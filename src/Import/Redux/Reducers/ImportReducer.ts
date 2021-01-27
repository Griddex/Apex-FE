import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  EXISTINGDATA_FAILURE,
  EXISTINGDATA_SUCCESS,
} from "../Actions/ExistingDataActions";
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
  SAVEINPUTDECK_SUCCESS,
  SAVEINPUTDECK_FAILURE,
} from "../Actions/ImportActions";
import importState from "../State/ImportState";

const inputReducer = (state = importState, action: IAction) => {
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
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [workflowProcessDefined]: {
            ...state.inputDataWorkflows[workflowProcessDefined],
            ...action.payload,
          },
        },
      };
    }
    case EXISTINGDATA_SUCCESS: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        existingDataWorkflows: {
          ...state.existingDataWorkflows,
          [workflowProcessDefined]: {
            ...state.existingDataWorkflows[workflowProcessDefined],
            ...action.payload,
          },
        },
      };
    }
    case EXISTINGDATA_FAILURE: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        existingDataWorkflows: {
          ...state.existingDataWorkflows,
          [workflowProcessDefined]: {
            ...state.existingDataWorkflows[workflowProcessDefined],
            ...action.payload.existingData,
          },
        },
      };
    }
    case SAVEINPUTDECK_SUCCESS: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [workflowProcessDefined]: {
            ...state.inputDataWorkflows[workflowProcessDefined],
            existingDataId: action.payload.data["id"], //please Gift use id
            statusCode: action.payload.statusCode, //please Gift use id
            success: action.payload.success, //please Gift use id
          },
        },
      };
    }
    case SAVEINPUTDECK_FAILURE: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [workflowProcessDefined]: {
            ...state.inputDataWorkflows[workflowProcessDefined],
            ...action.payload,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default inputReducer;
