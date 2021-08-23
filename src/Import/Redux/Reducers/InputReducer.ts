import set from "lodash.set";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
  UPDATE_SELECTEDIDTITLE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { IStoredDataProps } from "../../../Application/Types/ApplicationTypes";
import {
  STORED_INPUTDECK_FAILURE,
  STORED_INPUTDECK_SUCCESS,
} from "../Actions/StoredInputDeckActions";
import {
  FETCH_APPLICATIONHEADERS_SUCCESS,
  IMPORTFILE_INITIALIZATION,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_FILE,
  PERSIST_FILEHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEDATA,
  PERSIST_TABLEROLENAMES,
  PERSIST_VARIABLEUNITS,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
  SAVE_INPUTDECK_FAILURE,
  SAVE_INPUTDECK_SUCCESS,
  UPDATE_INPUT,
  RESET_INPUT,
} from "../Actions/InputActions";
import InputState from "../State/InputState";

const inputReducer = (state = InputState, action: IAction) => {
  switch (action.type) {
    case UPDATE_INPUT: {
      const { reducer, nameOrPath, value } = action.payload;

      if (reducer === "inputReducer") {
        console.log("inputReducer payload: ", action.payload);
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
    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
    case PERSIST_CHOSENAPPLICATIONUNITS:
    case PERSIST_CHOSENAPPLICATIONUNITINDICES:
    case PERSIST_CHOSENAPPLICATIONHEADERS:
    case PERSIST_FILEHEADERSMATCH:
    case PERSIST_FILEUNITSANDUNIQUEUNITS:
    case PERSIST_FILEUNITSMATCH:
    case PERSIST_TABLEROLENAMES:
    case PERSIST_TABLEDATA:
    case PERSIST_COLUMNNAMETABLEDATA: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined =
        workflowProcess as IAllWorkflows["wrkflwPrcss"];

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
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];

      return {
        ...state,
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
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];

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
        console.log("updatedState: ", updatedState);
        return updatedState;
      } else {
        return state;
      }
    }

    case GET_TABLEDATABYID_FAILURE: {
      const { errors } = action.payload;
      return { ...state, errors };
    }

    case RESET_INPUT: {
      return InputState;
    }

    default:
      return state;
  }
};

export default inputReducer;
