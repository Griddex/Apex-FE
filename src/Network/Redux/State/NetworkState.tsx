import { INetworkState } from "./NetworkStateTypes";

const networkState: INetworkState = {
  isAllForecastParameters: false,
  isAllDeclineParameters: false,
  isAllWellPrioritization: false,
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: { data: [] },
  showPopover: false,
  showNetworkElementDetails: null,

  nodeElements: [],
  edgeElements: [],
  nodeElementsManual: [],
  edgeElementsManual: [],
  showDrainagePointSummaryNodes: true,
  showDrainagePointSummaryEdges: true,

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

  nodesByIds: {
    drainagePointSummaryNode: {
      source: [],
      target: [],
    },
    drainagePointNode: {
      source: [],
      target: [],
    },
    manifoldNode: {
      source: [],
      target: [],
    },
    flowstationNode: {
      source: [],
      target: [],
    },
    gasFacilityNode: {
      source: [],
      target: [],
    },
    gatheringCenterNode: {
      source: [],
      target: [],
    },
    terminalNode: {
      source: [],
      target: [],
    },
  },
  networkId: "",
  networkTitle: "",
  networkDescription: "",
  status: 0,
  message: "",
  error: { message: "" },
  success: false,
  data: [],

  selectedTableData: [],

  selectedForecastingParametersId: "",
  selectedForecastingParametersTitle: "",
  selectedForecastingParametersDescription: "",
  selectedDeclineParametersId: "",
  selectedDeclineParametersTitle: "",
  selectedDeclineParametersDescription: "",

  selectedProductionPrioritizationId: "",
  selectedProductionPrioritizationTitle: "",
  selectedProductionPrioritizationDescription: "",

  loadNetworkGenerationWorkflow: false,

  selectedNetworkId: "",
  selectedNetworkTitle: "",
  storedDataWorkflows: {
    networkStored: [],
    forecastingParametersStored: [],
    declineParametersStored: [],
    productionPrioritizationStored: [],
  },


  selectedDeclineParametersData: [],
  currentProductionPrioritization: [],

  prioritizationPerspective: "",
  selectedStreamPrioritization: "",
  useSecondaryFacility: "",
};

export default networkState;
