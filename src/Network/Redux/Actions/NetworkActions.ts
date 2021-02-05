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
export const SAVEAUTOGENERATENETWORK_REQUEST =
  "SAVEAUTOGENERATENETWORK_REQUEST";
export const SAVEAUTOGENERATENETWORK_SUCCESS =
  "SAVEAUTOGENERATENETWORK_SUCCESS";
export const SAVEAUTOGENERATENETWORK_FAILURE =
  "SAVEAUTOGENERATENETWORK_FAILURE";
export const AUTOGENERATENETWORK_SUCCESS = "AUTOGENERATENETWORK_SUCCESS";
export const AUTOGENERATENETWORK_FAILURE = "AUTOGENERATENETWORK_FAILURE";
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

export const updateNetworkParameterAction = (name: string, value: string) => {
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
      statusCode: 0,
    },
  };
};

export const autoGenerateNetworkFailureAction = () => {
  return {
    type: AUTOGENERATENETWORK_FAILURE,
    payload: {
      statusCode: 0,
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
      statusCode: 0,
    },
  };
};

export const saveAndAutoGenerateNetworkFailureAction = () => {
  return {
    type: SAVEAUTOGENERATENETWORK_FAILURE,
    payload: {
      statusCode: 0,
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
      statusCode: 0,
    },
  };
};

export const saveNetworkFailureAction = () => {
  return {
    type: SAVENETWORK_FAILURE,
    payload: {
      statusCode: 0,
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
      statusCode: 0,
    },
  };
};

export const fetchExistingForecastingParametersFailureAction = () => {
  return {
    type: EXISTINGFORECASTPARAMETERS_FAILURE,
    payload: {
      statusCode: 0,
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
      statusCode: 0,
    },
  };
};

export const fetchExistingNetworkDataFailureAction = () => {
  return {
    type: EXISTINGNETWORKDATA_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};
