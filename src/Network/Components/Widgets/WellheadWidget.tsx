import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadPopover from "./../Popovers/WellheadPopover";
import WellheadContextMenu from "./../ContextMenu/WellheadContextMenu";
import { IXYPos } from "./WidgetTypes";

const WellheadWidget = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        style={{
          background: "#999",
          borderWidth: "0px",
          width: "4px",
          height: "4px",
          borderRadius: "0px",
        }}
      />
      <img
        src={Wellhead}
        width={20}
        height={20}
        draggable={false}
        alt="Wellhead"
      />
    </div>
  );
};

const WellheadNode = React.memo((props: Node & IXYPos) => {
  const { data, xPos, yPos } = props;
  const { forecastData } = data;
  const { showPopover, currentPopoverId } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <>
      {showPopover && props.id === currentPopoverId ? (
        <WellheadPopover data={forecastData}>
          <div>
            <WellheadContextMenu position={position}>
              <WellheadWidget />
            </WellheadContextMenu>
          </div>
        </WellheadPopover>
      ) : (
        <WellheadContextMenu position={position}>
          <WellheadWidget />
        </WellheadContextMenu>
      )}
    </>
  );
});

export default WellheadNode;
