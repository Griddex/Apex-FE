import { ArrowHeadType, FlowElement } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

const GenerateEdgeService = () => {
  const newEdge: FlowElement = {
    id: uuidv4(),
    source: "0",
    target: "1",
    type: "bezier",
    arrowHeadType: ArrowHeadType.ArrowClosed,
  };

  return newEdge;
};

export default GenerateEdgeService;
