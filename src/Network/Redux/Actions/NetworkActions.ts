import { FlowElement } from "react-flow-renderer";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { ICurrentPopoverData } from "../State/NetworkStateTypes";

export const UPDATE_NETWORKPARAMETER = "UPDATE_NETWORKPARAMETER";
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
export const SAVENETWORK_ISVALID = "SAVENETWORK_ISVALID";
export const AUTOGENERATENETWORK_REQUEST = "AUTOGENERATENETWORK_REQUEST";
export const AUTOGENERATENETWORK_SUCCESS = "AUTOGENERATENETWORK_SUCCESS";
export const AUTOGENERATENETWORK_FAILURE = "AUTOGENERATENETWORK_FAILURE";
export const DISPLAY_NETWORKBYID_REQUEST = "DISPLAY_NETWORKBYID_REQUEST";
export const DISPLAY_NETWORKBYID_SUCCESS = "DISPLAY_NETWORKBYID_SUCCESS";
export const DISPLAY_NETWORKBYID_FAILURE = "DISPLAY_NETWORKBYID_FAILURE";
export const SAVEAUTOGENERATENETWORK_REQUEST =
  "SAVEAUTOGENERATENETWORK_REQUEST";
export const SAVEAUTOGENERATENETWORK_SUCCESS =
  "SAVEAUTOGENERATENETWORK_SUCCESS";
export const SAVEAUTOGENERATENETWORK_FAILURE =
  "SAVEAUTOGENERATENETWORK_FAILURE";
export const SAVENETWORK_REQUEST = "SAVENETWORK_REQUEST";
export const SAVENETWORK_SUCCESS = "SAVENETWORK_SUCCESS";
export const SAVENETWORK_FAILURE = "SAVENETWORK_FAILURE";
export const EXISTINGFORECASTPARAMETERS_REQUEST =
  "EXISTINGFORECASTPARAMETERS_REQUEST";
export const EXISTINGFORECASTPARAMETERS_SUCCESS =
  "EXISTINGFORECASTPARAMETERS_SUCCESS";
export const EXISTINGFORECASTPARAMETERS_FAILURE =
  "EXISTINGFORECASTPARAMETERS_FAILURE";
export const EXISTINGNETWORKDATA_REQUEST = "EXISTINGNETWORKDATA_REQUEST";
export const EXISTINGNETWORKDATA_SUCCESS = "EXISTINGNETWORKDATA_SUCCESS";
export const EXISTINGNETWORKDATA_FAILURE = "EXISTINGNETWORKDATA_FAILURE";
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
export const EXISTING_DECLINEPARAMETERS_REQUEST =
  "EXISTING_DECLINEPARAMETERS_REQUEST";
export const EXISTING_DECLINEPARAMETERS_SUCCESS =
  "EXISTING_DECLINEPARAMETERS_SUCCESS";
export const EXISTING_DECLINEPARAMETERS_FAILURE =
  "EXISTING_DECLINEPARAMETERS_FAILURE";
export const EXISTING_PRODUCTIONPRIORITIZATION_REQUEST =
  "EXISTING_PRODUCTIONPRIORITIZATION_REQUEST";
export const EXISTING_PRODUCTIONPRIORITIZATION_SUCCESS =
  "EXISTING_PRODUCTIONPRIORITIZATION_SUCCESS";
export const EXISTING_PRODUCTIONPRIORITIZATION_FAILURE =
  "EXISTING_PRODUCTIONPRIORITIZATION_FAILURE";
export const SAVE_DECLINEPARAMETERS_REQUEST = "SAVE_DECLINEPARAMETERS_REQUEST";
export const SAVE_DECLINEPARAMETERS_SUCCESS = "SAVE_DECLINEPARAMETERS_SUCCESS";
export const SAVE_DECLINEPARAMETERS_FAILURE = "SAVE_DECLINEPARAMETERS_FAILURE";
export const SAVE_PRODUCTIONPRIORITIZATION_REQUEST =
  "SAVE_PRODUCTIONPRIORITIZATION_REQUEST";
export const SAVE_PRODUCTIONPRIORITIZATION_SUCCESS =
  "SAVE_PRODUCTIONPRIORITIZATION_SUCCESS";
export const SAVE_PRODUCTIONPRIORITIZATION_FAILURE =
  "SAVE_PRODUCTIONPRIORITIZATION_FAILURE";

//EXISTING_PRODUCTIONPRIORITIZATION_REQUEST
export const runForecastRequestAction = () => {
  return {
    type: RUN_FORECAST_REQUEST,
    meta: { showSpinner: true, message: "Running forecast..." },
  };
};

export const saveForecastRequestAction = () => {
  return {
    type: SAVE_FORECAST_REQUEST,
    meta: { showSpinner: true, message: "Saving forecast..." },
  };
};

export const updateNetworkParameterAction = (name: string, value: any) => {
  return {
    type: UPDATE_NETWORKPARAMETER,
    payload: {
      name,
      value,
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
      showWellheadDetails: false,
    },
  };
};

export const hideWellheadSummaryNodesAction = () => {
  return {
    type: HIDE_WELHEADSUMMARYNODES,
    payload: {
      showWellheadSummaryNodes: false,
    },
  };
};

export const hideWellheadSummaryEdgesAction = () => {
  return {
    type: HIDE_WELHEADSUMMARYEDGES,
    payload: {
      showWellheadSummaryEdges: false,
    },
  };
};

export const saveNetworkExtrudeIsValidAction = (
  saveNetworkExtrudeIsValid: boolean
) => {
  return {
    type: SAVENETWORK_ISVALID,
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
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  let inputDeck;

  if (workflowProcess.includes("facilities"))
    inputDeck = "facilities inputdeck";
  else if (workflowProcess.includes("forecast"))
    inputDeck = "forecast inputdeck";

  return {
    type: SAVEAUTOGENERATENETWORK_REQUEST,
    payload: { workflowProcess },
    meta: { message: `Saving ${inputDeck}...` },
  };
};

export const saveAndAutoGenerateNetworkSuccessAction = () => {
  return {
    type: SAVEAUTOGENERATENETWORK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveAndAutoGenerateNetworkFailureAction = () => {
  return {
    type: SAVEAUTOGENERATENETWORK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveNetworkRequestAction = () => {
  return {
    type: SAVENETWORK_REQUEST,
    meta: { showSpinner: true, message: "Saving network..." },
  };
};

export const saveNetworkSuccessAction = () => {
  return {
    type: SAVENETWORK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveNetworkFailureAction = () => {
  return {
    type: SAVENETWORK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingForecastingParametersRequestAction = (
  projectIdDefined: string
) => {
  return {
    type: EXISTINGFORECASTPARAMETERS_REQUEST,
    payload: { projectId: projectIdDefined },
  };
};

export const fetchExistingForecastingParametersSuccessAction = () => {
  return {
    type: EXISTINGFORECASTPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingForecastingParametersFailureAction = () => {
  return {
    type: EXISTINGFORECASTPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingNetworkDataRequestAction = (
  projectIdDefined: string
) => {
  return {
    type: EXISTINGNETWORKDATA_REQUEST,
    payload: { projectId: projectIdDefined },
  };
};

export const fetchExistingNetworkDataSuccessAction = () => {
  return {
    type: EXISTINGNETWORKDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingNetworkDataFailureAction = () => {
  return {
    type: EXISTINGNETWORKDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveForecastParametersRequestAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_REQUEST,
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

export const removeCurrentNetworkAction = () => {
  return {
    type: REMOVE_NETWORK,
  };
};

export const getDeclineParametersByIdRequestAction = () => {
  return {
    type: GET_DECLINEPARAMETERSBYID_REQUEST,
    meta: { showSpinner: true, message: "fetching decline parameters..." },
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

export const getProductionPrioritizationByIdRequestAction = () => {
  return {
    type: GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST,
    meta: { showSpinner: true, message: "fetching prioritization data..." },
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

export const fetchExistingDeclineParametersRequestAction = () => {
  return {
    type: EXISTING_DECLINEPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "fetching decline parameters data..." },
  };
};

export const fetchExistingDeclineParametersSuccessAction = () => {
  return {
    type: EXISTING_DECLINEPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingDeclineParametersFailureAction = () => {
  return {
    type: EXISTING_DECLINEPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingProductionPrioritizationRequestAction = () => {
  return {
    type: EXISTING_PRODUCTIONPRIORITIZATION_REQUEST,
    meta: { showSpinner: true, message: "fetching decline parameters data..." },
  };
};

export const fetchExistingProductionPrioritizationSuccessAction = () => {
  return {
    type: EXISTING_PRODUCTIONPRIORITIZATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingProductionPrioritizationFailureAction = () => {
  return {
    type: EXISTING_PRODUCTIONPRIORITIZATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
export const saveDeclineParametersRequestAction = () => {
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
