import { ArrowHeadType, FlowElement } from "@griddex/react-flow-updated";
import { uuid } from "uuidv4";

const GenerateEdgeService = () => {
  const newEdge: FlowElement = {
    id: uuid(),
    source: "0",
    target: "1",
    type: "step",
    arrowHeadType: ArrowHeadType.ArrowClosed,
  };

  return newEdge;
};

export default GenerateEdgeService;
