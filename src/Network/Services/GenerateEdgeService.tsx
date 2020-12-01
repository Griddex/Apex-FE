import { ArrowHeadType, FlowElement } from "react-flow-renderer";
import { uuid } from "uuidv4";

const GenerateEdgeService = () => {
  const newEdge: FlowElement = {
    id: uuid(),
    source: "0",
    target: "1",
    type: "bezier",
    arrowHeadType: ArrowHeadType.ArrowClosed,
  };

  return newEdge;
};

export default GenerateEdgeService;
