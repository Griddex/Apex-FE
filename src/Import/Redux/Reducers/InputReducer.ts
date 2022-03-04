import set from "lodash.set";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
  RESET_INPUTDATA_WORKFLOW,
  UPDATE_SELECTEDIDTITLE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { IStoredDataProps } from "../../../Application/Types/ApplicationTypes";
import {
  FETCH_APPLICATIONHEADERS_SUCCESS,
  IMPORTFILE_INITIALIZATION,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_FILE,
  PERSIST_FILEHEADERS,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_TABLEDATA,
  PERSIST_TABLEROLENAMES,
  PERSIST_VARIABLEUNITS,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
  RESET_INPUT,
  SAVE_INPUTDECK_FAILURE,
  SAVE_INPUTDECK_SUCCESS,
  UPDATE_INPUT,
} from "../Actions/InputActions";
import {
  STORED_INPUTDECK_FAILURE,
  STORED_INPUTDECK_SUCCESS,
} from "../Actions/StoredInputDeckActions";
import inputState from "../State/InputState";

const inputReducer = (state = inputState, action: IAction) => {
  switch (action.type) {
    case UPDATE_INPUT: {
      const { reducer, nameOrPath, value } = action.payload;

      if (reducer === "inputReducer") {
        const updatedState = set(state, nameOrPath, value);
        return updatedState;
      } else {
        return state;
      }
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
    case PERSIST_FILEUNITSANDUNIQUEUNITS:
    case PERSIST_TABLEROLENAMES:
    case PERSIST_TABLEDATA:
    case PERSIST_COLUMNNAMETABLEDATA: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as TAllWorkflowProcesses;

      if (reducer === "inputReducer") {
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
      } else {
        return state;
      }
    }

    case STORED_INPUTDECK_SUCCESS: {
      const { facilitiesInputDeckStored, forecastInputDeckStored } =
        action.payload;

      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          facilitiesInputDeckStored,
          forecastInputDeckStored,
        },
      };
    }

    case STORED_INPUTDECK_FAILURE: {
      const { workflowProcess } = action.payload;
      const wp = workflowProcess as NonNullable<IStoredDataProps["wkPs"]>;

      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          [wp as string]: {
            ...state.storedDataWorkflows[wp],
            ...action.payload.storedData,
          },
        },
      };
    }

    case SAVE_INPUTDECK_SUCCESS: {
      const { workflowProcess, storedDataId, status, success } = action.payload;
      const wp = workflowProcess as TAllWorkflowProcesses;

      return {
        ...state,
        selectedForecastInputDeckId: wp.toLowerCase().includes("forecast")
          ? storedDataId
          : "",
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          [wp]: {
            ...state.inputDataWorkflows[wp],
            storedDataId,
            status,
            success,
          },
        },
      };
    }

    case SAVE_INPUTDECK_FAILURE: {
      const { workflowProcess } = action.payload;
      const wp = workflowProcess as TAllWorkflowProcesses;

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

    case FETCH_APPLICATIONHEADERS_SUCCESS: {
      const {
        status,
        headerType,
        facilitiesAppHeaders,
        forecastAppHeaders,
        facilitiesHeadersSelectOptions,
        forecastHeadersSelectOptions,
        facilitiesHeadersNameMap,
        forecastHeadersNameMap,
      } = action.payload;

      return {
        ...state,
        status,
        headerType,
        facilitiesAppHeaders,
        forecastAppHeaders,
        facilitiesHeadersSelectOptions,
        forecastHeadersSelectOptions,
        facilitiesHeadersNameMap,
        forecastHeadersNameMap,
      };
    }

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      if (reducer === "inputReducer") {
        const updatedState = set(state, "selectedTableData", selectedTableData);
        return updatedState;
      } else {
        return state;
      }
    }

    case GET_TABLEDATABYID_FAILURE: {
      const { errors } = action.payload;
      return { ...state, errors };
    }

    case RESET_INPUTDATA_WORKFLOW: {
      const { reducer } = action.payload;
      const { inputDataWorkflows } = inputState;

      if (reducer !== "inputReducer") return state;

      return {
        ...state,
        inputDataWorkflows,
      };
    }

    case RESET_INPUT: {
      return inputState;
    }

    default:
      return state;
  }
};

export default inputReducer;
