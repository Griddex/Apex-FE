import { IIdNameTitlePathOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import {
  IEconomicsWorkflows,
  IInputWorkflows,
  ReducersType,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  TChartStory,
  TChartTypes,
} from "../../../Visualytics/Components/Charts/ChartTypes";
import {
  TDevScenarioNames,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "./../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";

export const LOAD_ECONOMICS_WORKFLOW = "LOAD_ECONOMICS_WORKFLOW";
export const UPDATE_ECONOMICSPARAMETER = "UPDATE_ECONOMICSPARAMETER";
export const UPDATE_ECONOMICSPARAMETERS = "UPDATE_ECONOMICSPARAMETERS";

export const SAVE_COSTSREVENUES_REQUEST = "SAVE_COSTSREVENUES_REQUEST";
export const SAVE_COSTSREVENUES_SUCCESS = "SAVE_COSTSREVENUES_SUCCESS";
export const SAVE_COSTSREVENUES_FAILURE = "SAVE_COSTSREVENUES_FAILURE";

export const SAVE_ECONOMICSPARAMETERS_REQUEST =
  "SAVE_ECONOMICSPARAMETERS_REQUEST";
export const SAVE_ECONOMICSPARAMETERS_SUCCESS =
  "SAVE_ECONOMICSPARAMETERS_SUCCESS";
export const SAVE_ECONOMICSPARAMETERS_FAILURE =
  "SAVE_ECONOMICSPARAMETERS_FAILURE";
export const FETCH_COSTSREVENUESHEADERS_REQUEST =
  "FETCH_COSTSREVENUESHEADERS_REQUEST";
export const FETCH_COSTSREVENUESHEADERS_SUCCESS =
  "FETCH_COSTSREVENUESHEADERS_SUCCESS";
export const FETCH_COSTSREVENUESHEADERS_FAILURE =
  "FETCH_COSTSREVENUESHEADERS_FAILURE";

export const PERSIST_COSTSREVENUESHEADERSSELECTOPTION_FAILURE =
  "PERSIST_COSTSREVENUESHEADERSSELECTOPTION_FAILURE";

export const FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST =
  "FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST";
export const FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS =
  "FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS";
export const FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE =
  "FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE";

export const TRANSFORM_ECONOMICSRESULTS_CHARTDATA =
  "TRANSFORM_ECONOMICSRESULTS_CHARTDATA";
export const TRANSFORM_ECONOMICSRESULTS_CHARTDATA_SUCCESS =
  "TRANSFORM_ECONOMICSRESULTS_CHARTDATA_SUCCESS";
export const TRANSFORM_ECONOMICSRESULTS_CHARTDATA_FAILURE =
  "TRANSFORM_ECONOMICSRESULTS_CHARTDATA_FAILURE";

export const STORED_ECONOMICSDATA_REQUEST = "STORED_ECONOMICSDATA_REQUEST";
export const STORED_ECONOMICSDATA_SUCCESS = "STORED_ECONOMICSDATA_SUCCESS";
export const STORED_ECONOMICSDATA_FAILURE = "STORED_ECONOMICSDATA_FAILURE";

export const STORED_ECONOMICSSENSITIVITIES_REQUEST =
  "STORED_ECONOMICSSENSITIVITIES_REQUEST";
export const STORED_ECONOMICSSENSITIVITIES_SUCCESS =
  "STORED_ECONOMICSSENSITIVITIES_SUCCESS";
export const STORED_ECONOMICSSENSITIVITIES_FAILURE =
  "STORED_ECONOMICSSENSITIVITIES_FAILURE";

export const SAVE_ECONOMICSSENSITIVITIES_REQUEST =
  "SAVE_ECONOMICSSENSITIVITIES_REQUEST";
export const SAVE_ECONOMICSSENSITIVITIES_SUCCESS =
  "SAVE_ECONOMICSSENSITIVITIES_SUCCESS";
export const SAVE_ECONOMICSSENSITIVITIES_FAILURE =
  "SAVE_ECONOMICSSENSITIVITIES_FAILURE";

export const GET_ECONOMICSSENSITIVITIESBYID_REQUEST =
  "GET_ECONOMICSSENSITIVITIESBYID_REQUEST";
export const GET_ECONOMICSSENSITIVITIESBYID_SUCCESS =
  "GET_ECONOMICSSENSITIVITIESBYID_SUCCESS";
export const GET_ECONOMICSSENSITIVITIESBYID_FAILURE =
  "GET_ECONOMICSSENSITIVITIESBYID_FAILURE";

export const GET_ECONOMICSPLOT_CHARTDATA_REQUEST =
  "GET_ECONOMICSPLOT_CHARTDATA_REQUEST";
export const GET_ECONOMICSPLOT_CHARTDATA_SUCCESS =
  "GET_ECONOMICSPLOT_CHARTDATA_SUCCESS";
export const GET_ECONOMICSPLOT_CHARTDATA_FAILURE =
  "GET_ECONOMICSPLOT_CHARTDATA_FAILURE";

export const TRANSFORM_ECONOMICSPLOT_CHARTDATA =
  "TRANSFORM_ECONOMICSPLOT_CHARTDATA";
export const TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS =
  "TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS";
export const TRANSFORM_ECONOMICSPLOT_CHARTDATA_FAILURE =
  "TRANSFORM_ECONOMICSPLOT_CHARTDATA_FAILURE";

export const RUN_ECONOMICSANALYSIS_REQUEST = "RUN_ECONOMICSANALYSIS_REQUEST";
export const RUN_ECONOMICSANALYSIS_SUCCESS = "RUN_ECONOMICSANALYSIS_SUCCESS";
export const RUN_ECONOMICSANALYSIS_FAILURE = "RUN_ECONOMICSANALYSIS_FAILURE";
export const PERSIST_COSTSREVENUESDECKS = "PERSIST_COSTSREVENUESDECKS";
export const FETCH_HEATMAPDATA_REQUEST = "FETCH_HEATMAPDATA_REQUEST";
export const FETCH_HEATMAPDATA_SUCCESS = "FETCH_HEATMAPDATA_SUCCESS";
export const FETCH_HEATMAPDATA_FAILURE = "FETCH_HEATMAPDATA_FAILURE";

export const RUN_ECONOMICSFORECASTAGGREGATION_REQUEST =
  "RUN_ECONOMICSFORECASTAGGREGATION_REQUEST";
export const RUN_ECONOMICSFORECASTAGGREGATION_SUCCESS =
  "RUN_ECONOMICSFORECASTAGGREGATION_SUCCESS";
export const RUN_ECONOMICSFORECASTAGGREGATION_FAILURE =
  "RUN_ECONOMICSFORECASTAGGREGATION_FAILURE";

export const SAVE_ECONOMICSRESULTS_REQUEST = "SAVE_ECONOMICSRESULTS_REQUEST";
export const SAVE_ECONOMICSRESULTS_SUCCESS = "SAVE_ECONOMICSRESULTS_SUCCESS";
export const SAVE_ECONOMICSRESULTS_FAILURE = "SAVE_ECONOMICSRESULTS_FAILURE";

export const STORED_ECONOMICSRESULTS_REQUEST =
  "STORED_ECONOMICSRESULTS_REQUEST";
export const STORED_ECONOMICSRESULTS_SUCCESS =
  "STORED_ECONOMICSRESULTS_SUCCESS";
export const STORED_ECONOMICSRESULTS_FAILURE =
  "STORED_ECONOMICSRESULTS_FAILURE";

export const GET_ECONOMICSRESULTSBYID_REQUEST =
  "GET_ECONOMICSRESULTSBYID_REQUEST";
export const GET_ECONOMICSRESULTSBYID_SUCCESS =
  "GET_ECONOMICSRESULTSBYID_SUCCESS";
export const GET_ECONOMICSRESULTSBYID_FAILURE =
  "GET_ECONOMICSRESULTSBYID_FAILURE";

export const ECONOMICS_TREEVIEWKEYS_REQUEST = "ECONOMICS_TREEVIEWKEYS_REQUEST";
export const ECONOMICS_TREEVIEWKEYS_SUCCESS = "ECONOMICS_TREEVIEWKEYS_SUCCESS";
export const ECONOMICS_TREEVIEWKEYS_FAILURE = "ECONOMICS_TREEVIEWKEYS_FAILURE";
export const RESET_ECONOMICS = "RESET_ECONOMICS";

export const GET_ECONOMICSPARAMETERSBYID_REQUEST =
  "GET_DECLINEPARAMETERSBYID_REQUEST";

export const ECONOMICS_UPDATE_CHARTCATEGORY = "ECONOMICS_UPDATE_CHARTCATEGORY";

export const ECONOMICSPLOTCHARTS_UPDATE_HASDROPPED =
  "ECONOMICSPLOTCHARTS_UPDATE_HASDROPPED";
export const ECONOMICSPLOTCHARTS_UPDATE_DRAGITEMS =
  "ECONOMICSPLOTCHARTS_UPDATE_DRAGITEMS";

export const ECONOMICSHEATMAP_UPDATE_HASDROPPED =
  "ECONOMICSHEATMAP_UPDATE_HASDROPPED";
export const ECONOMICSHEATMAP_UPDATE_DRAGITEMS =
  "ECONOMICSHEATMAP_UPDATE_DRAGITEMS";

export const ECONOMICS_REMOVE_CHARTCATEGORY = "ECONOMICS_REMOVE_CHARTCATEGORY";

export const RESET_PLOTCHARTS_CHARTWORKFLOWS =
  "RESET_PLOTCHARTS_CHARTWORKFLOWS";
export const RESET_HEATMAP_CHARTWORKFLOWS = "RESET_HEATMAP_CHARTWORKFLOWS";
export const RESET_TEMPLATE_CHARTWORKFLOWS = "RESET_TEMPLATE_CHARTWORKFLOWS";

export const UPDATE_BY_PARAMETERSTABLE = "UPDATE_BY_PARAMETERSTABLE";

export const updateEconomicsParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_ECONOMICSPARAMETER,
    payload: {
      path,
      value,
    },
  };
};

export const updateEconomicsParametersAction = (
  updateObj: Record<string, any>
) => {
  return {
    type: UPDATE_ECONOMICSPARAMETERS,
    payload: {
      updateObj,
    },
  };
};

export const getEconomicsParametersByIdRequestAction = (
  selectedEconomicsParametersId: string,
  reducer: ReducersType,
  isCreateOrEdit: boolean
) => {
  return {
    type: GET_ECONOMICSPARAMETERSBYID_REQUEST,
    payload: {
      selectedEconomicsParametersId,
      reducer,
      isCreateOrEdit,
    },
    meta: { showSpinner: true, message: "Loading economics parameters..." },
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

export const fetchStoredCostsRevenuesHeadersRequestAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_REQUEST,
  };
};

export const fetchStoredCostsRevenuesHeadersSuccessAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredCostsRevenuesDataFailureAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveCostsRevenuesRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  reducer: ReducersType,
  titleDesc: Record<string, string>
) => {
  return {
    type: SAVE_COSTSREVENUES_REQUEST,
    payload: { workflowProcess, reducer, titleDesc },
    meta: { showSpinner: true, message: "Saving costs & revenues..." },
  };
};

export const saveCostsRevenuesSuccessAction = () => {
  return {
    type: SAVE_COSTSREVENUES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveCostsRevenuesFailureAction = () => {
  return {
    type: SAVE_COSTSREVENUES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsParametersHeadersRequestAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST,
  };
};

export const fetchStoredEconomicsParametersHeadersSuccessAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsParametersDataFailureAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const transformEconomicsResultsChartDataAction = () => {
  return {
    type: TRANSFORM_ECONOMICSRESULTS_CHARTDATA,
    payload: {
      status: 0,
    },
  };
};

export const transformEconomicsResultsChartDataSuccessAction = () => {
  return {
    type: TRANSFORM_ECONOMICSRESULTS_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const transformEconomicsResultsChartDataFailureAction = () => {
  return {
    type: TRANSFORM_ECONOMICSRESULTS_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsParametersRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  reducer: ReducersType,
  titleDesc: Record<string, string>
) => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_REQUEST,
    payload: { workflowProcess, reducer, titleDesc },
    meta: { showSpinner: true, message: "Saving economics parameters..." },
  };
};

export const saveEconomicsParametersSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsParametersFailureAction = () => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsDataRequestAction = (projectId: string) => {
  return {
    type: STORED_ECONOMICSDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading economics data..." },
  };
};

export const fetchStoredEconomicsDataSuccessAction = () => {
  return {
    type: STORED_ECONOMICSDATA_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredEconomicsDataFailureAction = () => {
  return {
    type: STORED_ECONOMICSDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsSensitivitiesRequestAction = (
  projectId: string,
  shouldShowSpinner: boolean
) => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_REQUEST,
    payload: { projectId },
    meta: {
      showSpinner: shouldShowSpinner,
      message: "Loading economics sensitivities...",
    },
  };
};

export const fetchStoredEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsSensitivitiesFailureAction = () => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsSensitivitiesRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType,
  analysisName: TEconomicsAnalysesNames,
  titleDesc: Record<string, string>
) => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_REQUEST,
    payload: { workflowProcess, reducer, analysisName, titleDesc },
    meta: { showSpinner: true, message: "Saving economics sensitivities..." },
  };
};

export const saveEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsSensitivitiesFailureAction = () => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getEconomicsSensitivitiesByIdRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType,
  showSpinner: boolean
) => {
  return {
    type: GET_ECONOMICSSENSITIVITIESBYID_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner, message: "Loading economics sensitivities..." },
  };
};

export const getEconomicsSensitivitiesByIdSuccessAction = () => {
  return {
    type: GET_ECONOMICSSENSITIVITIESBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsSensitivitiesByIdFailureAction = () => {
  return {
    type: GET_ECONOMICSSENSITIVITIESBYID_FAILURE,
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
    type: RUN_ECONOMICSANALYSIS_REQUEST,
    payload: { workflowProcess, analysisName, analysisTitle },
    meta: { showSpinner: true, message: `Calculating ${analysisTitle}...` },
  };
};

export const runEconomicsAnalysisSuccessAction = () => {
  return {
    type: RUN_ECONOMICSANALYSIS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runEconomicsAnalysisFailureAction = () => {
  return {
    type: RUN_ECONOMICSANALYSIS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistCostsRevenueDeckstAction = (
  devVal: TDevScenarioNames,
  devRows: IRawRow[]
) => {
  return {
    type: PERSIST_COSTSREVENUESDECKS,
    payload: { devVal, devRows },
  };
};

export const getEconomicsPlotChartDataRequestAction = (
  reducer: ReducersType,
  workflowCategory: TAllWorkflowCategories
) => {
  return {
    type: GET_ECONOMICSPLOT_CHARTDATA_REQUEST,
    payload: { reducer, workflowCategory },
  };
};

export const getEconomicsPlotChartDataSuccessAction = () => {
  return {
    type: GET_ECONOMICSPLOT_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsPlotChartDataFailureAction = () => {
  return {
    type: GET_ECONOMICSPLOT_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const transformEconomicsChartDataAction = (reducer: ReducersType) => {
  return {
    type: TRANSFORM_ECONOMICSPLOT_CHARTDATA,
    payload: {
      reducer,
    },
  };
};

export const transformEconomicsChartDataSuccessAction = () => {
  return {
    type: TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const transformEconomicsChartDataFailureAction = () => {
  return {
    type: TRANSFORM_ECONOMICSPLOT_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getHeatMapDataRequestAction = (
  analysisName: TEconomicsAnalysesNames,
  analysisTitle: TEconomicsAnalysesTitles,
  noOfSensitivities: number,
  selectedDevScenario?: string,
  variableZlength?: number,
  variableZKey?: string,
  selectedZ?: string
) => {
  return {
    type: FETCH_HEATMAPDATA_REQUEST,
    payload: {
      analysisName,
      analysisTitle,
      noOfSensitivities,
      variableZlength,
      selectedDevScenario,
      variableZKey,
      selectedZ,
    },
    meta: { showSpinner: true, message: `Loading map data...` },
  };
};

export const fetchHeatMapDataSuccessAction = () => {
  return {
    type: FETCH_HEATMAPDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchHeatMapDataFailureAction = () => {
  return {
    type: FETCH_HEATMAPDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const runEconomicsForecastAggregationRequestAction = (
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: RUN_ECONOMICSFORECASTAGGREGATION_REQUEST,
    payload: { workflowProcess },
    meta: {
      showSpinner: true,
      message: "Running forecast aggregation per scenario...",
    },
  };
};

export const runEconomicsForecastAggregationSuccessAction = () => {
  return {
    type: RUN_ECONOMICSFORECASTAGGREGATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runEconomicsForecastAggregationFailureAction = () => {
  return {
    type: RUN_ECONOMICSFORECASTAGGREGATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsResultsRequestAction = (
  titleDesc: Record<string, string>
) => {
  return {
    type: SAVE_ECONOMICSRESULTS_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner: true, message: "Saving economics results..." },
  };
};

export const saveEconomicsResultsSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsResultsFailureAction = () => {
  return {
    type: SAVE_ECONOMICSRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsResultsRequestAction = (
  projectId: string,
  showSpinner: boolean
) => {
  return {
    type: STORED_ECONOMICSRESULTS_REQUEST,
    payload: { projectId },
    meta: { showSpinner, message: "Loading economics results..." },
  };
};

export const fetchStoredEconomicsResultsSuccessAction = () => {
  return {
    type: STORED_ECONOMICSRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsResultsFailureAction = () => {
  return {
    type: STORED_ECONOMICSRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getEconomicsResultsByIdRequestAction = (
  switchToRoute: boolean,
  routeUrl?: string
) => {
  return {
    type: GET_ECONOMICSRESULTSBYID_REQUEST,
    payload: { switchToRoute, routeUrl },
    meta: { showSpinner: true, message: "Loading economics result..." },
  };
};

export const getEconomicsResultsByIdSuccessAction = () => {
  return {
    type: GET_ECONOMICSRESULTSBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsResultsByIdFailureAction = () => {
  return {
    type: GET_ECONOMICSRESULTSBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchEconomicsTreeviewKeysRequestAction = (
  willShowSuccessDialog: boolean,
  perspective: "heatMapTree" | "plotChartsTree" | "templatesTree",
  idTitleDescIsSaved?: Record<string, any>
) => {
  return {
    type: ECONOMICS_TREEVIEWKEYS_REQUEST,
    payload: { willShowSuccessDialog, perspective, idTitleDescIsSaved },
    meta: { showSpinner: true, message: "Loading economics result..." },
  };
};

export const fetchEconomicsTreeviewKeysSuccessAction = () => {
  return {
    type: ECONOMICS_TREEVIEWKEYS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchEconomicsTreeviewKeysFailureAction = () => {
  return {
    type: ECONOMICS_TREEVIEWKEYS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const updateEconomicsChartCategoryAction = (
  categoryOptionTitle: string,
  item: any
) => {
  return {
    type: ECONOMICS_UPDATE_CHARTCATEGORY,
    payload: { categoryOptionTitle, item },
  };
};

export const removeEconomicsChartCategoryAction = (
  chartStory: TChartStory,
  chartType: TChartTypes,
  categoryTitle: string,
  categoryOptionTitle: string,
  id: any
) => {
  return {
    type: ECONOMICS_REMOVE_CHARTCATEGORY,
    payload: {
      chartStory,
      chartType,
      categoryTitle,
      categoryOptionTitle,
      id,
    },
  };
};

export const updateEconomicsHeatMapDragItemsAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryDragItemsTitle: string,
  item: IIdNameTitlePathOption
) => {
  return {
    type: ECONOMICSHEATMAP_UPDATE_DRAGITEMS,
    payload: { reducer, categoryTitle, categoryDragItemsTitle, item },
  };
};

export const updateEconomicsHeatMapHasDroppedAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryHasDroppedTitle: string,
  id: string,
  hasDropped: boolean
) => {
  return {
    type: ECONOMICSHEATMAP_UPDATE_HASDROPPED,
    payload: {
      reducer,
      categoryTitle,
      categoryHasDroppedTitle,
      id,
      hasDropped,
    },
  };
};

export const updateEconomicsPlotChartsDragItemsAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryDragItemsTitle: string,
  item: IIdNameTitlePathOption
) => {
  return {
    type: ECONOMICSPLOTCHARTS_UPDATE_DRAGITEMS,
    payload: { reducer, categoryTitle, categoryDragItemsTitle, item },
  };
};

export const updateEconomicsPlotChartsHasDroppedAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryHasDroppedTitle: string,
  id: string,
  hasDropped: boolean
) => {
  return {
    type: ECONOMICSPLOTCHARTS_UPDATE_HASDROPPED,
    payload: {
      reducer,
      categoryTitle,
      categoryHasDroppedTitle,
      id,
      hasDropped,
    },
  };
};

export const resetPlotChartsWorkflowsAction = () => {
  return {
    type: RESET_PLOTCHARTS_CHARTWORKFLOWS,
  };
};

export const resetHeatMapWorkflowsAction = () => {
  return {
    type: RESET_HEATMAP_CHARTWORKFLOWS,
  };
};

export const resetTemplateChartsWorkflowsAction = () => {
  return {
    type: RESET_TEMPLATE_CHARTWORKFLOWS,
  };
};

export const updateByParametersTableAction = (
  variableName: string,
  parametersTable: IRawRow[]
) => {
  return {
    type: UPDATE_BY_PARAMETERSTABLE,
    payload: {
      variableName,
      parametersTable,
    },
  };
};

export const resetEconomicsAction = () => {
  return {
    type: RESET_ECONOMICS,
  };
};
