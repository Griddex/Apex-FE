import set from "lodash.set";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
  UPDATE_SELECTEDIDTITLE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
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
  UPDATE_INPUT,
} from "../../../Import/Redux/Actions/InputActions";
import { TEconomicsAnalysesNames } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import {
  STORED_ECONOMICSDATA_SUCCESS,
  STORED_ECONOMICSSENSITIVITIES_FAILURE,
  STORED_ECONOMICSSENSITIVITIES_SUCCESS,
  FETCH_COSTSREVENUESHEADERS_FAILURE,
  FETCH_COSTSREVENUESHEADERS_SUCCESS,
  FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE,
  FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS,
  GETECONOMICSSENSITIVITIESBYID_FAILURE,
  GETECONOMICSSENSITIVITIESBYID_SUCCESS,
  LOAD_ECONOMICS_WORKFLOW,
  RUNECONOMICSANALYSIS_FAILURE,
  RUNECONOMICSANALYSIS_SUCCESS,
  UPDATE_ECONOMICSPARAMETER,
  RESET_ECONOMICS,
} from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case UPDATE_ECONOMICSPARAMETER: {
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
    case PERSIST_COLUMNNAMETABLEDATA: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined =
        workflowProcess as IAllWorkflows["wrkflwPrcss"];

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

    case FETCH_COSTSREVENUESHEADERS_SUCCESS: {
      const {
        costsRevenuesAppHeaders,
        cstRevAppHeadersSelectOptions,
        cstRevAppHeadersNameMaps,
      } = action.payload;

      return {
        ...state,
        costsRevenuesAppHeaders,
        cstRevAppHeadersSelectOptions,
        cstRevAppHeadersNameMaps,
      };
    }

    case FETCH_COSTSREVENUESHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS: {
      const {
        economicsParametersAppHeaders,
        ecoParAppHeadersSelectOptions,
        ecoParAppHeadersNameMap,
      } = action.payload;

      return {
        ...state,
        economicsParametersAppHeaders,
        ecoParAppHeadersSelectOptions,
        ecoParAppHeadersNameMap,
      };
    }

    case FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case STORED_ECONOMICSDATA_SUCCESS: {
      const {
        economicsCostsRevenuesDeckStored,
        economicsParametersDeckStored,
      } = action.payload;

      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          economicsCostsRevenuesDeckStored,
          economicsParametersDeckStored,
        },
      };
    }

    case STORED_ECONOMICSSENSITIVITIES_FAILURE:
    case STORED_ECONOMICSSENSITIVITIES_SUCCESS: {
      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          ...action.payload,
        },
      };
    }

    case RUNECONOMICSANALYSIS_FAILURE:
    case RUNECONOMICSANALYSIS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GETECONOMICSSENSITIVITIESBYID_FAILURE:
    case GETECONOMICSSENSITIVITIESBYID_SUCCESS: {
      const { analysisName, analysisTableTitle, sensitivitiesTable } =
        action.payload;

      const analysisNameDefined = analysisName as TEconomicsAnalysesNames;
      return {
        ...state,
        selectedSensitivitiesTable: sensitivitiesTable,
        economicsAnalysisWorkflows: {
          ...state.economicsAnalysisWorkflows,
          [analysisName]: {
            ...state.economicsAnalysisWorkflows[analysisNameDefined],
            analysisTableTitle,
          },
        },
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

    case RESET_ECONOMICS: {
      return EconomicsState;
    }

    default:
      return state;
  }
};

export default economicsReducer;
