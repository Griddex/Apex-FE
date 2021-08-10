import { FlowElement } from "react-flow-renderer";
import {
  IAllWorkflows,
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { TTitleDescription } from "../../../Application/Types/ApplicationTypes";
import { ICurrentPopoverData } from "../State/NetworkStateTypes";

export const UPDATE_NETWORKPARAMETER = "UPDATE_NETWORKPARAMETER";
export const UPDATE_NETWORK_PARAMETERS = "UPDATE_NETWORK_PARAMETERS";
export const SET_CURRENTELEMENT = "SET_CURRENTELEMENT";
export const PERSIST_NETWORKELEMENTS = "PERSIST_NETWORKELEMENTS";
export const ADD_NETWORKELEMENT = "ADD_NETWORKELEMENT";
export const PERSIST_POPOVER = "PERSIST_POPOVER";
export const SHOW_POPOVER = "SHOW_POPOVER";
export const PERSIST_POPOVERID = "PERSIST_POPOVERID";
export const SHOW_NETWORKELEMENTDETAILS = "SHOW_NETWORKELEMENTDETAILS";
export const HIDE_NETWORKELEMENTDETAILS = "HIDE_NETWORKELEMENTDETAILS";
export const HIDE_WELHEADSUMMARYNODES = "HIDE_WELHEADSUMMARYNODES";
export const HIDE_WELHEADSUMMARYEDGES = "HIDE_WELHEADSUMMARYEDGES";
export const SAVE_NETWORK_ISVALID = "SAVE_NETWORK_ISVALID";
export const AUTOGENERATENETWORK_REQUEST = "AUTOGENERATENETWORK_REQUEST";
export const AUTOGENERATENETWORK_SUCCESS = "AUTOGENERATENETWORK_SUCCESS";
export const AUTOGENERATENETWORK_FAILURE = "AUTOGENERATENETWORK_FAILURE";
export const DISPLAY_NETWORKBYID_REQUEST = "DISPLAY_NETWORKBYID_REQUEST";
export const DISPLAY_NETWORKBYID_SUCCESS = "DISPLAY_NETWORKBYID_SUCCESS";
export const DISPLAY_NETWORKBYID_FAILURE = "DISPLAY_NETWORKBYID_FAILURE";
export const SAVE_AUTOGENERATENETWORK_REQUEST =
  "SAVE_AUTOGENERATENETWORK_REQUEST";
export const SAVE_AUTOGENERATENETWORK_SUCCESS =
  "SAVE_AUTOGENERATENETWORK_SUCCESS";
export const SAVE_AUTOGENERATENETWORK_FAILURE =
  "SAVE_AUTOGENERATENETWORK_FAILURE";
export const SAVE_NETWORK_REQUEST = "SAVE_NETWORK_REQUEST";
export const SAVE_NETWORK_SUCCESS = "SAVE_NETWORK_SUCCESS";
export const SAVE_NETWORK_FAILURE = "SAVE_NETWORK_FAILURE";
export const STORED_FORECASTPARAMETERS_REQUEST =
  "STORED_FORECASTPARAMETERS_REQUEST";
export const STORED_FORECASTPARAMETERS_SUCCESS =
  "STORED_FORECASTPARAMETERS_SUCCESS";
export const STORED_FORECASTPARAMETERS_FAILURE =
  "STORED_FORECASTPARAMETERS_FAILURE";
export const STORED_NETWORKDATA_REQUEST = "STORED_NETWORKDATA_REQUEST";
export const STORED_NETWORKDATA_SUCCESS = "STORED_NETWORKDATA_SUCCESS";
export const STORED_NETWORKDATA_FAILURE = "STORED_NETWORKDATA_FAILURE";
export const RUN_FORECAST_REQUEST = "RUN_FORECAST_REQUEST";
export const SAVE_FORECAST_REQUEST = "SAVE_FORECAST_REQUEST";
export const SAVE_FORECASTPARAMETERS_REQUEST =
  "SAVE_FORECASTPARAMETERS_REQUEST";
export const SAVE_FORECASTPARAMETERS_SUCCESS =
  "SAVE_FORECASTPARAMETERS_SUCCESS";
export const SAVE_FORECASTPARAMETERS_FAILURE =
  "SAVE_FORECASTPARAMETERS_FAILURE";
export const UPDATE_FORECASTPARAMETERS_REQUEST =
  "UPDATE_FORECASTPARAMETERS_REQUEST";
export const UPDATE_FORECASTPARAMETERS_SUCCESS =
  "UPDATE_FORECASTPARAMETERS_SUCCESS";
export const UPDATE_FORECASTPARAMETERS_FAILURE =
  "UPDATE_FORECASTPARAMETERS_FAILURE";
export const PERSIST_FORECASTPARAMETERS = "PERSIST_FORECASTPARAMETERS";
export const REMOVE_NETWORK = "REMOVE_NETWORK";
export const GET_DECLINEPARAMETERSBYID_REQUEST =
  "GET_DECLINEPARAMETERSBYID_REQUEST";
export const GET_DECLINEPARAMETERSBYID_SUCCESS =
  "GET_DECLINEPARAMETERSBYID_SUCCESS";
export const GET_DECLINEPARAMETERSBYID_FAILURE =
  "GET_DECLINEPARAMETERSBYID_FAILURE";
export const GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST =
  "GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST";
export const GET_PRODUCTIONPRIORITIZATIONBYID_SUCCESS =
  "GET_PRODUCTIONPRIORITIZATIONBYID_SUCCESS";
export const GET_PRODUCTIONPRIORITIZATIONBYID_FAILURE =
  "GET_PRODUCTIONPRIORITIZATIONBYID_FAILURE";
export const STORED_DECLINEPARAMETERS_REQUEST =
  "STORED_DECLINEPARAMETERS_REQUEST";
export const STORED_DECLINEPARAMETERS_SUCCESS =
  "STORED_DECLINEPARAMETERS_SUCCESS";
export const STORED_DECLINEPARAMETERS_FAILURE =
  "STORED_DECLINEPARAMETERS_FAILURE";
export const STORED_PRODUCTIONPRIORITIZATION_REQUEST =
  "STORED_PRODUCTIONPRIORITIZATION_REQUEST";
export const STORED_PRODUCTIONPRIORITIZATION_SUCCESS =
  "STORED_PRODUCTIONPRIORITIZATION_SUCCESS";
export const STORED_PRODUCTIONPRIORITIZATION_FAILURE =
  "STORED_PRODUCTIONPRIORITIZATION_FAILURE";
export const SAVE_DECLINEPARAMETERS_REQUEST = "SAVE_DECLINEPARAMETERS_REQUEST";
export const SAVE_DECLINEPARAMETERS_SUCCESS = "SAVE_DECLINEPARAMETERS_SUCCESS";
export const SAVE_DECLINEPARAMETERS_FAILURE = "SAVE_DECLINEPARAMETERS_FAILURE";
export const SAVE_PRODUCTIONPRIORITIZATION_REQUEST =
  "SAVE_PRODUCTIONPRIORITIZATION_REQUEST";
export const SAVE_PRODUCTIONPRIORITIZATION_SUCCESS =
  "SAVE_PRODUCTIONPRIORITIZATION_SUCCESS";
export const SAVE_PRODUCTIONPRIORITIZATION_FAILURE =
  "SAVE_PRODUCTIONPRIORITIZATION_FAILURE";
export const RESET_NETWORK = "RESET_NETWORK";

export const runForecastRequestAction = () => {
  return {
    type: RUN_FORECAST_REQUEST,
    meta: { showSpinner: true, message: "Running forecast..." },
  };
};

export const saveForecastRequestAction = (
  titleDesc: Record<string, string>
) => {
  return {
    type: SAVE_FORECAST_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner: true, message: "Saving forecast..." },
  };
};

export const updateNetworkParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_NETWORKPARAMETER,
    payload: {
      path,
      value,
    },
  };
};

export const updateNetworkParametersAction = (
  updateObj: Record<string, any>
) => {
  return {
    type: UPDATE_NETWORK_PARAMETERS,
    payload: {
      updateObj,
    },
  };
};

export const setCurrentElementAction = (currentElement: FlowElement) => {
  return {
    type: SET_CURRENTELEMENT,
    payload: {
      currentElement,
    },
  };
};

export const setCurrentPopoverIdAction = (currentPopoverId: string) => {
  return {
    type: PERSIST_POPOVERID,
    payload: {
      currentPopoverId,
    },
  };
};

export const setCurrentPopoverDataAction = (
  currentPopoverData: ICurrentPopoverData
) => {
  return {
    type: PERSIST_POPOVER,
    payload: {
      currentPopoverData,
    },
  };
};

export const showPopoverAction = (showPopover: boolean) => {
  return {
    type: SHOW_POPOVER,
    payload: {
      showPopover,
    },
  };
};

export const persistNetworkElementsAction = (
  nodeElements: FlowElement[],
  edgeElements: FlowElement[]
) => {
  return {
    type: PERSIST_NETWORKELEMENTS,
    payload: {
      nodeElements,
      edgeElements,
    },
    meta: { showSpinner: false, message: "Persisting to store..." },
  };
};

export const addNetworkElementAction = (element: FlowElement) => {
  return {
    type: ADD_NETWORKELEMENT,
    payload: element,
    meta: { showSpinner: false, message: "Persisting to store..." },
  };
};

export const showNetworkElementDetailsAction = (networkElement: string) => {
  return {
    type: SHOW_NETWORKELEMENTDETAILS,
    payload: {
      showNetworkElementDetails: networkElement,
    },
  };
};

export const hideNetworkElementDetailsAction = () => {
  return {
    type: HIDE_NETWORKELEMENTDETAILS,
    payload: {
      showDrainagePointDetails: false,
    },
  };
};

export const hideDrainagePointSummaryNodesAction = () => {
  return {
    type: HIDE_WELHEADSUMMARYNODES,
    payload: {
      showDrainagePointSummaryNodes: false,
    },
  };
};

export const hideDrainagePointSummaryEdgesAction = () => {
  return {
    type: HIDE_WELHEADSUMMARYEDGES,
    payload: {
      showDrainagePointSummaryEdges: false,
    },
  };
};

export const saveNetworkExtrudeIsValidAction = (
  saveNetworkExtrudeIsValid: boolean
) => {
  return {
    type: SAVE_NETWORK_ISVALID,
    payload: {
      saveNetworkExtrudeIsValid,
    },
  };
};

export const displayNetworkByIdRequestAction = () => {
  return {
    type: DISPLAY_NETWORKBYID_REQUEST,
    meta: { showSpinner: true, message: "Displaying network..." },
  };
};

export const displayNetworkByIdSuccessAction = () => {
  return {
    type: DISPLAY_NETWORKBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const displayNetworkByIdFailureAction = () => {
  return {
    type: DISPLAY_NETWORKBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const autoGenerateNetworkRequestAction = () => {
  return {
    type: AUTOGENERATENETWORK_REQUEST,
    meta: { showSpinner: true, message: "Generating network..." },
  };
};

export const autoGenerateNetworkSuccessAction = () => {
  return {
    type: AUTOGENERATENETWORK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const autoGenerateNetworkFailureAction = () => {
  return {
    type: AUTOGENERATENETWORK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveAndAutoGenerateNetworkRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  titleDesc: TTitleDescription
) => {
  let inputDeck;

  return {
    type: SAVE_AUTOGENERATENETWORK_REQUEST,
    payload: { workflowProcess, titleDesc },
    meta: { message: `Saving ${inputDeck}...` },
  };
};

export const saveAndAutoGenerateNetworkSuccessAction = () => {
  return {
    type: SAVE_AUTOGENERATENETWORK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveAndAutoGenerateNetworkFailureAction = () => {
  return {
    type: SAVE_AUTOGENERATENETWORK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveNetworkRequestAction = (titleDesc: Record<string, string>) => {
  return {
    type: SAVE_NETWORK_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner: true, message: "Saving network..." },
  };
};

export const saveNetworkSuccessAction = () => {
  return {
    type: SAVE_NETWORK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveNetworkFailureAction = () => {
  return {
    type: SAVE_NETWORK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredForecastingParametersRequestAction = (
  projectIdDefined: string,
  showSpinner = false
) => {
  return {
    type: STORED_FORECASTPARAMETERS_REQUEST,
    payload: { projectId: projectIdDefined },
    meta: { showSpinner, message: "Fetching forecast parameters..." },
  };
};

export const fetchStoredForecastingParametersSuccessAction = () => {
  return {
    type: STORED_FORECASTPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredForecastingParametersFailureAction = () => {
  return {
    type: STORED_FORECASTPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredNetworkDataRequestAction = (
  projectIdDefined?: string
) => {
  return {
    type: STORED_NETWORKDATA_REQUEST,
    payload: { projectId: projectIdDefined },
  };
};

export const fetchStoredNetworkDataSuccessAction = () => {
  return {
    type: STORED_NETWORKDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredNetworkDataFailureAction = () => {
  return {
    type: STORED_NETWORKDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

// Record<string, string>
export const saveForecastParametersRequestAction = (
  titleDesc: any
) => {
  return {
    type: SAVE_FORECASTPARAMETERS_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner: true, message: "Saving forecast parameters..." },
  };
};

export const saveForecastParametersSuccessAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const saveForecastParametersFailureAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const updateForecastParametersRequestAction = () => {
  return {
    type: UPDATE_FORECASTPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "Updating forecast parameters..." },
  };
};

export const updateForecastParametersSuccessAction = () => {
  return {
    type: UPDATE_FORECASTPARAMETERS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const updateForecastParametersFailureAction = () => {
  return {
    type: UPDATE_FORECASTPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistForecastParametersAction = (
  targetFluid: string,
  timeFrequency: string,
  defermentDecision: string,
  realtimeResults: string,
  endForecastDate: Date
) => {
  return {
    type: PERSIST_FORECASTPARAMETERS,
    payload: {
      targetFluid,
      timeFrequency,
      defermentDecision,
      realtimeResults,
      endForecastDate,
    },
    meta: { showSpinner: true, message: "" },
  };
};

export const removeCurrentNetworkAction = (showSpinner: boolean) => {
  return {
    type: REMOVE_NETWORK,
    meta: { showSpinner, message: "Removing network..." },
  };
};

export const getDeclineParametersByIdRequestAction = (
  reducer: ReducersType,
  isCreateOrEdit: any,
  currentRow: any,
  currentSN: number
) => {
  return {
    type: GET_DECLINEPARAMETERSBYID_REQUEST,
    payload: {
      reducer,
      isCreateOrEdit,
      currentRow,
      currentSN
    },
    meta: { showSpinner: true, message: "Fetching decline parameters..." },
  };
};

export const getDeclineParametersByIdSuccessAction = () => {
  return {
    type: GET_DECLINEPARAMETERSBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getDeclineParametersByIdFailureAction = () => {
  return {
    type: GET_DECLINEPARAMETERSBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getProductionPrioritizationByIdRequestAction = (
  selectedProductionPrioritizationId: string,
  selectedProductionPrioritizationTitle: string,
  selectedRowIndex: number,
  reducer: ReducersType,
  isCreateOrEdit: boolean,
) => {
  console.log("getProductionPrioritizationByIdRequestAction called");
  return {
    type: GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST,
    payload: {
      selectedProductionPrioritizationId,
      selectedProductionPrioritizationTitle,
      selectedRowIndex,
      reducer,
      isCreateOrEdit
    },
    meta: { showSpinner: true, message: "Fetching prioritization data..." },
  };
};

export const getProductionPrioritizationByIdSuccessAction = () => {
  return {
    type: GET_PRODUCTIONPRIORITIZATIONBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getProductionPrioritizationByIdFailureAction = () => {
  return {
    type: GET_PRODUCTIONPRIORITIZATIONBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredDeclineCurveParametersRequestAction = (
  projectId: string,
  showSpinner = false
) => {
  console.log("fetchStoredDeclineCurveParametersRequestAction called");
  return {
    type: STORED_DECLINEPARAMETERS_REQUEST,
    payload: { projectId },
    meta: { showSpinner, message: "fetching decline parameters data..." }
  };
  /* return {
    type: STORED_DECLINEPARAMETERS_REQUEST,
    payload: { projectId },
    meta: { showSpinner, message: "fetching decline parameters data..." },
  }; */
};

export const fetchStoredDeclineCurveParametersSuccessAction = () => {
  return {
    type: STORED_DECLINEPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredDeclineCurveParametersFailureAction = () => {
  return {
    type: STORED_DECLINEPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredProductionPrioritizationRequestAction = (
  projectId: string,
  showSpinner = false
) => {
  return {
    type: STORED_PRODUCTIONPRIORITIZATION_REQUEST,
    payload: { projectId },
    meta: {
      showSpinner,
      message: "fetching production prioritization data...",
    },
  };
};

export const fetchStoredProductionPrioritizationSuccessAction = () => {
  return {
    type: STORED_PRODUCTIONPRIORITIZATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredProductionPrioritizationFailureAction = () => {
  return {
    type: STORED_PRODUCTIONPRIORITIZATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
export const saveDeclineParametersRequestAction = (
  titleDesc: any
) => {
  return {
    type: SAVE_DECLINEPARAMETERS_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner: true, message: "Saving decline parameters data..." },
  };
};

export const saveDeclineParametersRequestActionForFP = () => {
  return {
    type: SAVE_DECLINEPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "Saving decline parameters data..." },
  };
};

export const saveDeclineParametersSuccessAction = () => {
  return {
    type: SAVE_DECLINEPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveDeclineParametersFailureAction = () => {
  return {
    type: SAVE_DECLINEPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
export const saveProductionPrioritizationRequestAction = () => {
  return {
    type: SAVE_PRODUCTIONPRIORITIZATION_REQUEST,
    meta: {
      showSpinner: true,
      message: "Saving production prioritization data...",
    },
  };
};

export const saveProductionPrioritizationSuccessAction = () => {
  return {
    type: SAVE_PRODUCTIONPRIORITIZATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveProductionPrioritizationFailureAction = () => {
  return {
    type: SAVE_PRODUCTIONPRIORITIZATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const resetNetworkAction = () => {
  return {
    type: RESET_NETWORK,
  };
};
