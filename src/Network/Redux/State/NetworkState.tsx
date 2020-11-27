import { FlowElement } from "@griddex/react-flow-updated";
interface INetworkState {
  currentElement: number | string | Record<string, unknown>;
  currentPopoverId: string;
  currentPopoverData: number | string | Record<string, unknown>;
  showPopover: boolean;
  nodeElements: FlowElement[];
  edgeElements: FlowElement[];
}
const networkState: INetworkState = {
  currentElement: {},
  currentPopoverId: "",
  currentPopoverData: {},
  showPopover: false,
  nodeElements: [],
  edgeElements: [],
};

export default networkState;
