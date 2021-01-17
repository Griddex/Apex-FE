import { INetworkState } from "./NetworkStateTypes";

const networkState: INetworkState = {
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: [],
  showPopover: false,
  showNetworkElementDetails: null,
  networkName: "",
  networkDescription: "",
  nodeElements: [],
  edgeElements: [],
  showWellheadSummaryNodes: true,
  showWellheadSummaryEdges: true,
  statusCode: "",
  result: "",

  saveForecastParameters: {
    forecastParametersName: "",
    forecastParametersDescription: "",
    hSPName: "Oil",
    timeFrequency: "Yearly",
    realtimeResults: "No",
    endForecastDate: new Date(),
  },

  isValids: { saveNetworkExtrudeIsValid: false },
};

export default networkState;
