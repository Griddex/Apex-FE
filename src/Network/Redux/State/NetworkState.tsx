import { FlowElement } from "react-flow-renderer";
interface INetworkState {
  currentElement: number | string | Record<string, unknown>;
  currentPopoverId: string;
  currentPopoverData: number | string | Record<string, unknown>[];
  showPopover: boolean;
  showNetworkElementContextMenu:
    | null
    | "showWellheadContextMenu"
    | "showManifoldContextMenu"
    | "showFlowstationContextMenu"
    | "showGasfacilityContextMenu"
    | "showTerminalContextMenu";
  nodeElements: FlowElement[];
  edgeElements: FlowElement[];
  showWellheadSummaryNodes: boolean;
  showWellheadSummaryEdges: boolean;
  statusCode: string;
  result: string;
  errors: string[];
}
const networkState: INetworkState = {
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: [],
  showPopover: false,
  showNetworkElementContextMenu: null,
  nodeElements: [],
  edgeElements: [],
  showWellheadSummaryNodes: true,
  showWellheadSummaryEdges: true,
  statusCode: "",
  result: "",
  errors: [],
};

export default networkState;
