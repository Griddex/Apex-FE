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

  saveForecastParameters: {
    forecastParametersTitle: "",
    forecastParametersDescription: "",
    targetFluidTitle: "Oil",
    timeFrequency: "Yearly",
    defermentDecision: "Add Deferment",
    realtimeResults: "No",
    endForecastDate: new Date(),
  },

  isValids: { saveNetworkExtrudeIsValid: false },

  isNetworkSaved: false,
  isNetworkChanged: false,
  networkId: "",
  networkTitle: "",
  networkDescription: "",
  statusCode: 0,
  message: "",
  error: { message: "" },
  success: false,
  data: [],

  selectedForecastingParametersId: "",

  selectedNetworkId: "",
  selectedNetworkTitle: "",
  existingDataWorkflows: {
    networkExisting: [],
    forecastingParametersExisting: [],
  },
};

export default networkState;
