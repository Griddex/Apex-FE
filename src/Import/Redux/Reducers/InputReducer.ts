import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import {
  EXISTINGDATA_FAILURE,
  EXISTINGDATA_SUCCESS,
} from "../Actions/ExistingDataActions";
import {
  UPDATE_INPUT,
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
  FETCHAPPLICATIONHEADERS_SUCCESS,
  FETCHAPPLICATIONHEADERS_FAILURE,
} from "../Actions/ImportActions";
import InputState from "../State/InputState";

const inputReducer = (state = InputState, action: IAction) => {
  switch (action.type) {
    case UPDATE_INPUT: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
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
      const workflowProcessDefined = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: {
            ...state.importDataWorkflows[workflowProcessDefined],
            ...action.payload,
          },
        },
      };
    }
    case EXISTINGDATA_SUCCESS: {
      const {
        facilitiesInputDeckExisting,
        forecastInputDeckExisting,
      } = action.payload;

      return {
        ...state,
        existingDataWorkflows: {
          ...state.existingDataWorkflows,
          facilitiesInputDeckExisting,
          forecastInputDeckExisting,
        },
      };
    }
    case EXISTINGDATA_FAILURE: {
      const { workflowProcess } = action.payload;
      const wp = workflowProcess as NonNullable<IExistingDataProps["wkPs"]>;

      return {
        ...state,
        existingDataWorkflows: {
          ...state.existingDataWorkflows,
          [wp as string]: {
            ...state.existingDataWorkflows[wp],
            ...action.payload.existingData,
          },
        },
      };
    }
    case SAVEINPUTDECK_SUCCESS: {
      const { workflowProcess, data, statusCode, success } = action.payload;
      const wp = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [wp]: {
            ...state.importDataWorkflows[wp],
            existingDataId: data, //please Gift use id
            statusCode, //please Gift use id
            success, //please Gift use id
          },
        },
      };
    }
    case SAVEINPUTDECK_FAILURE: {
      const { workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [wp]: {
            ...state.importDataWorkflows[wp],
            ...action.payload,
          },
        },
      };
    }
    case FETCHAPPLICATIONHEADERS_SUCCESS: {
      const {
        statusCode,
        headerType,
        facilitiesInputHeaders,
        forecastInputHeaders,
      } = action.payload;

      return {
        ...state,
        statusCode,
        headerType,
        facilitiesInputHeaders,
        forecastInputHeaders,
      };
    }
    default:
      return state;
  }
};

export default inputReducer;