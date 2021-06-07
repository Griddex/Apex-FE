import { INetworkState } from "./NetworkStateTypes";

const networkState: INetworkState = {
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: { data: [] },
  showPopover: false,
  showNetworkElementDetails: null,

  nodeElements: [],
  edgeElements: [],
  showWellheadSummaryNodes: true,
  showWellheadSummaryEdges: true,

  parameterEntries: {
    forecastParametersTitle: "",
    forecastParametersDescription: "",
    targetFluid: "Oil",
    timeFrequency: "Monthly",
    defermentDecision: "Add Deferment",
    realtimeResults: "No",
    endForecastDate: new Date(),
  },
  declineParameters: [],
  forecastParametersTitle: "",
  forecastParametersDescription: "",

  isValids: { saveNetworkExtrudeIsValid: false },

  isNetworkSaved: false,
  isNetworkChanged: false,
  isNetworkDisplayed: false,
  isNetworkAuto: false,

  networkId: "",
  networkTitle: "",
  networkDescription: "",
  status: 0,
  message: "",
  error: { message: "" },
  success: false,
  data: [],

  selectedForecastingParametersId: "",
  selectedForecastingParametersTitle: "",
  selectedDeclineParametersId: "",
  selectedDeclineParametersTitle: "",
  selectedProductionPrioritizationId: "",
  selectedProductionPrioritizationTitle: "",

  loadNetworkGenerationWorkflow: false,

  selectedNetworkId: "",
  selectedNetworkTitle: "",
  existingDataWorkflows: {
    networkExisting: [],
    forecastingParametersExisting: [],
    declineParametersExisting: [],
    productionPrioritizationExisting: [],
  },
};

export default networkState;
