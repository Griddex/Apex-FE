import { FlowElement } from "react-flow-renderer";
import {
  IAllWorkflowProcesses,
  IImportWorkflowProcess,
} from "../../../Application/Components/Workflows/WorkflowTypes";
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
export const DISPLAYNETWORKBYSELECTION_REQUEST =
  "DISPLAYNETWORKBYSELECTION_REQUEST";
export const DISPLAYNETWORKBYSELECTION_SUCCESS =
  "DISPLAYNETWORKBYSELECTION_SUCCESS";
export const DISPLAYNETWORKBYSELECTION_FAILURE =
  "DISPLAYNETWORKBYSELECTION_FAILURE";
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

export const displayNetworkBySelectionRequestAction = () => {
  return {
    type: DISPLAYNETWORKBYSELECTION_REQUEST,
    meta: { showSpinner: true, message: "Displaying network..." },
  };
};

export const displayNetworkBySelectionSuccessAction = () => {
  return {
    type: DISPLAYNETWORKBYSELECTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const displayNetworkBySelectionFailureAction = () => {
  return {
    type: DISPLAYNETWORKBYSELECTION_FAILURE,
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
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

export const fetchExistingForecastingParametersRequestAction = () => {
  return {
    type: EXISTINGFORECASTPARAMETERS_REQUEST,
    meta: { showSpinner: true },
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

export const fetchExistingNetworkDataRequestAction = () => {
  return {
    type: EXISTINGNETWORKDATA_REQUEST,
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
