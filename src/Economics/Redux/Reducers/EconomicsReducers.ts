import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  FETCHCOSTSREVENUESHEADERS_FAILURE,
  FETCHCOSTSREVENUESHEADERS_SUCCESS,
  FETCHECONOMICSPARAMETERSHEADERS_FAILURE,
  FETCHECONOMICSPARAMETERSHEADERS_SUCCESS,
  LOAD_ECONOMICS_WORKFLOW,
  UPDATE_ECONOMICS,
} from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";
import set from "lodash.set";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_VARIABLEUNITS,
  PERSIST_FILE,
  PERSIST_WORKSHEETNAMES,
  PERSIST_WORKSHEET,
  PERSIST_FILEHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEROLENAMES,
  PERSIST_TABLEDATA,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_TABLEHEADERS,
  UPDATE_INPUT,
} from "../../../Import/Redux/Actions/InputActions";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case UPDATE_ECONOMICS: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_INPUT: {
      const { reducer, nameOrPath, value } = action.payload;

      if (reducer === "economicsReducer") {
        const updatedState = set(state, nameOrPath, value);
        return updatedState;
      } else {
        return state;
      }
    }

    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }

    case LOAD_ECONOMICS_WORKFLOW: {
      return {
        ...state,
        [action.payload.name]: true,
      };
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
    case PERSIST_COLUMNNAMETABLEDATA:
    case PERSIST_TABLEHEADERS: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

      if (reducer === "economicsReducer") {
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

    case FETCHCOSTSREVENUESHEADERS_SUCCESS: {
      const { costsRevenuesAppHeaders } = action.payload;

      return {
        ...state,
        costsRevenuesAppHeaders,
      };
    }

    case FETCHCOSTSREVENUESHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case FETCHECONOMICSPARAMETERSHEADERS_SUCCESS: {
      const { economicsParametersAppHeaders } = action.payload;

      return {
        ...state,
        economicsParametersAppHeaders,
      };
    }

    case FETCHECONOMICSPARAMETERSHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    default:
      return state;
  }
};

export default economicsReducer;
