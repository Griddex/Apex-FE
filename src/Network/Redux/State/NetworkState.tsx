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
  errors: [],
};

export default networkState;
