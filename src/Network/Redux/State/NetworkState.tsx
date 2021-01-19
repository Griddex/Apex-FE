import { INetworkState } from "./NetworkStateTypes";

const networkState: INetworkState = {
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: { data: "" },
  showPopover: false,
  showNetworkElementDetails: null,
  networkName: "",
  networkDescription: "",
  nodeElements: [],
  edgeElements: [],
  showWellheadSummaryNodes: true,
  showWellheadSummaryEdges: true,
  statusCode: "",
  data: "",

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
