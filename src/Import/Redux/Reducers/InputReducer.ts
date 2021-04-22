import set from "lodash.set";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import {
  EXISTINGDATA_FAILURE,
  EXISTINGDATA_SUCCESS,
} from "../Actions/ExistingDataActions";
import {
  FETCHAPPLICATIONHEADERS_SUCCESS,
  IMPORTFILE_INITIALIZATION,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
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
  PERSIST_VARIABLEUNITS,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
  SAVEINPUTDECK_FAILURE,
  SAVEINPUTDECK_SUCCESS,
  UPDATE_INPUT,
} from "../Actions/InputActions";
import InputState from "../State/InputState";

const inputReducer = (state = InputState, action: IAction) => {
  switch (action.type) {
    case UPDATE_INPUT: {
      const { nameOrPath, value } = action.payload;

      const updatedState = set(state, nameOrPath, value);
      return updatedState;
    }
    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "inputReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }
    case IMPORTFILE_INITIALIZATION:
    case PERSIST_VARIABLEUNITS:
    case PERSIST_FILE:
    case PERSIST_WORKSHEETNAMES:
    case PERSIST_WORKSHEET:
    case PERSIST_FILEHEADERS:
    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
    case PERSIST_CHOSENAPPLICATIONUNITS:
    case PERSIST_CHOSENAPPLICATIONUNITINDICES:
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
      const {
        workflowProcess,
        existingDataId,
        status,
        success,
      } = action.payload;
      const wp = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      return {
        ...state,
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [wp]: {
            ...state.inputDataWorkflows[wp],
            existingDataId,
            status,
            success,
          },
        },
      };
    }
    case SAVEINPUTDECK_FAILURE: {
      const { workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      return {
        ...state,
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [wp]: {
            ...state.inputDataWorkflows[wp],
            ...action.payload,
          },
        },
      };
    }
    case FETCHAPPLICATIONHEADERS_SUCCESS: {
      const {
        status,
        headerType,
        facilitiesInputHeaders,
        forecastInputHeaders,
      } = action.payload;

      return {
        ...state,
        status,
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
