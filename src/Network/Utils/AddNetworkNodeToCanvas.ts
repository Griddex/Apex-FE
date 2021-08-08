import { XYPosition } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TNodeTypes } from "../Components/Widgets/WidgetTypes";
import { addNetworkElementAction } from "../Redux/Actions/NetworkActions";
import GenerateNodeByPositionService from "../Services/GenerateNodeByPositionService";

const addNetworkNodeToCanvas = (
  dispatch: Dispatch<any>,
  nodePosition: XYPosition,
  nodeType: TNodeTypes
) => {
  const newElementPosition = {
    x: nodePosition.x + 20,
    y: nodePosition.y + 20,
  };

  const newElement = GenerateNodeByPositionService(
    nodeType,
    newElementPosition
  );

  dispatch(addNetworkElementAction("Node", newElement));
};

export default addNetworkNodeToCanvas;
