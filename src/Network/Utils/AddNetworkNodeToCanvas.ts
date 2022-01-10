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
    x: (nodePosition?.x as number) + 20,
    y: (nodePosition?.y as number) + 20,
  };

  const newElement = GenerateNodeByPositionService(
    nodeType,
    newElementPosition
  );

  dispatch(addNetworkElementAction("Node", newElement));
};

export default addNetworkNodeToCanvas;
