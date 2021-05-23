import {
  IEconomicsAnalysis,
  TDevScenarioNames,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "./../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import {
  IAllWorkflows,
  IEconomicsWorkflows,
  IInputWorkflows,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

export const LOAD_ECONOMICS_WORKFLOW = "LOAD_ECONOMICS_WORKFLOW";
export const UPDATE_ECONOMICS = "UPDATE_ECONOMICS";
export const EXISTINGCOSTSREVENUESDATA_REQUEST =
  "EXISTINGCOSTSREVENUESDATA_REQUEST";
export const EXISTINGCOSTSREVENUESDATA_SUCCESS =
  "EXISTINGCOSTSREVENUESDATA_SUCCESS";
export const EXISTINGCOSTSREVENUESDATA_FAILURE =
  "EXISTINGCOSTSREVENUESDATA_FAILURE";

export const EXISTINGECONOMICSPARAMETERSDATA_REQUEST =
  "EXISTINGECONOMICSPARAMETERSDATA_REQUEST";
export const EXISTINGECONOMICSPARAMETERSDATA_SUCCESS =
  "EXISTINGECONOMICSPARAMETERSDATA_SUCCESS";
export const EXISTINGECONOMICSPARAMETERSDATA_FAILURE =
  "EXISTINGECONOMICSPARAMETERSDATA_FAILURE";

export const SAVECOSTSREVENUES_REQUEST = "SAVECOSTSREVENUES_REQUEST";
export const SAVECOSTSREVENUES_SUCCESS = "SAVECOSTSREVENUES_SUCCESS";
export const SAVECOSTSREVENUES_FAILURE = "SAVECOSTSREVENUES_FAILURE";
export const SAVEECONOMICSPARAMETERS_REQUEST =
  "SAVEECONOMICSPARAMETERS_REQUEST";
export const SAVEECONOMICSPARAMETERS_SUCCESS =
  "SAVEECONOMICSPARAMETERS_SUCCESS";
export const SAVEECONOMICSPARAMETERS_FAILURE =
  "SAVEECONOMICSPARAMETERS_FAILURE";
export const FETCHCOSTSREVENUESHEADERS_REQUEST =
  "FETCHCOSTSREVENUESHEADERS_REQUEST";
export const FETCHCOSTSREVENUESHEADERS_SUCCESS =
  "FETCHCOSTSREVENUESHEADERS_SUCCESS";
export const FETCHCOSTSREVENUESHEADERS_FAILURE =
  "FETCHCOSTSREVENUESHEADERS_FAILURE";
export const PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS =
  "PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS";
export const PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE =
  "PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE";

export const FETCHECONOMICSPARAMETERSHEADERS_REQUEST =
  "FETCHECONOMICSPARAMETERSHEADERS_REQUEST";
export const FETCHECONOMICSPARAMETERSHEADERS_SUCCESS =
  "FETCHECONOMICSPARAMETERSHEADERS_SUCCESS";
export const FETCHECONOMICSPARAMETERSHEADERS_FAILURE =
  "FETCHECONOMICSPARAMETERSHEADERS_FAILURE";

export const PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS =
  "PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS";
export const PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE =
  "PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE";

export const EXISTINGECONOMICSDATA_REQUEST = "EXISTINGECONOMICSDATA_REQUEST";
export const EXISTINGECONOMICSDATA_SUCCESS = "EXISTINGECONOMICSDATA_SUCCESS";
export const EXISTINGECONOMICSDATA_FAILURE = "EXISTINGECONOMICSDATA_FAILURE";

export const EXISTINGECONOMICSSENSITIVITIES_REQUEST =
  "EXISTINGECONOMICSSENSITIVITIES_REQUEST";
export const EXISTINGECONOMICSSENSITIVITIES_SUCCESS =
  "EXISTINGECONOMICSSENSITIVITIES_SUCCESS";
export const EXISTINGECONOMICSSENSITIVITIES_FAILURE =
  "EXISTINGECONOMICSSENSITIVITIES_FAILURE";

export const SAVEECONOMICSSENSITIVITIES_REQUEST =
  "SAVEECONOMICSSENSITIVITIES_REQUEST";
export const SAVEECONOMICSSENSITIVITIES_SUCCESS =
  "SAVEECONOMICSSENSITIVITIES_SUCCESS";
export const SAVEECONOMICSSENSITIVITIES_FAILURE =
  "SAVEECONOMICSSENSITIVITIES_FAILURE";

export const GETECONOMICSSENSITIVITIESBYID_REQUEST =
  "GETECONOMICSSENSITIVITIESBYID_REQUEST";
export const GETECONOMICSSENSITIVITIESBYID_SUCCESS =
  "GETECONOMICSSENSITIVITIESBYID_SUCCESS";
export const GETECONOMICSSENSITIVITIESBYID_FAILURE =
  "GETECONOMICSSENSITIVITIESBYID_FAILURE";

export const RUNECONOMICSANALYSIS_REQUEST = "RUNECONOMICSANALYSIS_REQUEST";
export const RUNECONOMICSANALYSIS_SUCCESS = "RUNECONOMICSANALYSIS_SUCCESS";
export const RUNECONOMICSANALYSIS_FAILURE = "RUNECONOMICSANALYSIS_FAILURE";
export const PERSIST_ECONOMICSDECK = "PERSIST_ECONOMICSDECK";
export const CALCULATE_HEATMAPDATA_REQUEST = "CALCULATE_HEATMAPDATA_REQUEST";
export const CALCULATE_HEATMAPDATA_SUCCESS = "CALCULATE_HEATMAPDATA_SUCCESS";
export const CALCULATE_HEATMAPDATA_FAILURE = "CALCULATE_HEATMAPDATA_FAILURE";

export const updateEconomicsParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_ECONOMICS,
    payload: {
      path,
      value,
    },
  };
};

export const loadEconomicsWorkflowAction = (name: string) => {
  return {
    type: LOAD_ECONOMICS_WORKFLOW,
    payload: {
      name,
    },
  };
};

export const fetchExistingCostsRevenuesHeadersRequestAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_REQUEST,
  };
};

export const fetchExistingCostsRevenuesHeadersSuccessAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingCostsRevenuesDataFailureAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistCostsRevHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistCostsRevDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveCostsRevenuesRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"],
  reducer: ReducersType
) => {
  return {
    type: SAVECOSTSREVENUES_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving costs & revenues..." },
  };
};

export const saveCostsRevenuesSuccessAction = () => {
  return {
    type: SAVECOSTSREVENUES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveCostsRevenuesFailureAction = () => {
  return {
    type: SAVECOSTSREVENUES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingEconomicsParametersHeadersRequestAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_REQUEST,
  };
};

export const fetchExistingEconomicsParametersHeadersSuccessAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingEconomicsParametersDataFailureAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistEconomicsParHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistEconomicsParDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsParametersRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"],
  reducer: ReducersType
) => {
  return {
    type: SAVEECONOMICSPARAMETERS_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving economics parameters..." },
  };
};

export const saveEconomicsParametersSuccessAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsParametersFailureAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingEconomicsDataRequestAction = (projectId: string) => {
  return {
    type: EXISTINGECONOMICSDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading economics data..." },
  };
};

export const fetchExistingEconomicsDataSuccessAction = () => {
  return {
    type: EXISTINGECONOMICSDATA_SUCCESS,
    payload: { facilitiesInputDeckExisting: [], forecastInputDeckExisting: [] },
  };
};

export const fetchExistingEconomicsDataFailureAction = () => {
  return {
    type: EXISTINGECONOMICSDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingEconomicsSensitivitiesRequestAction = (
  projectId: string,
  shouldShowSpinner: boolean
) => {
  return {
    type: EXISTINGECONOMICSSENSITIVITIES_REQUEST,
    payload: { projectId },
    meta: {
      showSpinner: shouldShowSpinner,
      message: "Loading economics sensitivities...",
    },
  };
};

export const fetchExistingEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: EXISTINGECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingEconomicsSensitivitiesFailureAction = () => {
  return {
    type: EXISTINGECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsSensitivitiesRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType,
  analysisName: TEconomicsAnalysesNames
) => {
  return {
    type: SAVEECONOMICSSENSITIVITIES_REQUEST,
    payload: { workflowProcess, reducer, analysisName },
    meta: { showSpinner: true, message: "Saving economics sensitivities..." },
  };
};

export const saveEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: SAVEECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsSensitivitiesFailureAction = () => {
  return {
    type: SAVEECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getEconomicsSensitivitiesByIdRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType
) => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Loading economics sensitivities..." },
  };
};

export const getEconomicsSensitivitiesByIdSuccessAction = () => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsSensitivitiesByIdFailureAction = () => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const runEconomicsAnalysisRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  analysisName: TEconomicsAnalysesNames,
  analysisTitle: TEconomicsAnalysesTitles
) => {
  return {
    type: RUNECONOMICSANALYSIS_REQUEST,
    payload: { workflowProcess, analysisName, analysisTitle },
    meta: { showSpinner: true, message: `Calculating ${analysisTitle}...` },
  };
};

export const runEconomicsAnalysisSuccessAction = () => {
  return {
    type: RUNECONOMICSANALYSIS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runEconomicsAnalysisFailureAction = () => {
  return {
    type: RUNECONOMICSANALYSIS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistEconomicsDeckRequestAction = (
  workflowProcess: IInputWorkflows["wkPs"],
  devValue: TDevScenarioNames,
  rows: IRawRow[],
  isRowsInPayload: boolean
) => {
  return {
    type: PERSIST_ECONOMICSDECK,
    payload: { workflowProcess, devValue, rows },
    meta: { isRowsInPayload },
  };
};

export const calculateHeatMapDataRequestAction = (
  analysisName: TEconomicsAnalysesNames,
  analysisTitle: TEconomicsAnalysesTitles,
  selectedZValue: string
) => {
  return {
    type: CALCULATE_HEATMAPDATA_REQUEST,
    payload: { analysisName, analysisTitle, selectedZValue },
    meta: { showSpinner: true, message: `Calculating map data...` },
  };
};

export const calculateHeatMapDataSuccessAction = () => {
  return {
    type: CALCULATE_HEATMAPDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const calculateHeatMapDataFailureAction = () => {
  return {
    type: CALCULATE_HEATMAPDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
