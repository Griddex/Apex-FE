import { FlowElement } from "@griddex/react-flow-updated";
interface INetworkState {
  currentElement: number | string | Record<string, unknown>;
  nodeElements: FlowElement[];
  edgeElements: FlowElement[];
}
const networkState: INetworkState = {
  currentElement: {},
  nodeElements: [],
  edgeElements: [],
};

export default networkState;
