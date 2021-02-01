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
    forecastParametersName: "",
    forecastParametersDescription: "",
    hSPName: "Oil",
    timeFrequency: "Yearly",
    realtimeResults: "No",
    endForecastDate: new Date(),
  },

  isValids: { saveNetworkExtrudeIsValid: false },

  isNetworkSaved: false,
  networkTitle: "",
  networkDescription: "",
  statusCode: 0,
  message: "",
  error: { message: "" },
  success: false,
  data: [],

  existingDataWorkflow: {
    networkExisting: {
      id: "",
      userId: "",
      status: "Not Started",
      title: "",
      description: "",
      author: { avatarUrl: "", name: "" },
      approvers: [],
      createdOn: "",
      modifiedOn: "",
    },
  },
};

export default networkState;
