import { Handle, Node, Position } from "react-flow-renderer";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/RootReducer";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadPopover from "./../Popovers/WellheadPopover";
import WellheadContextMenu from "./../ContextMenu/WellheadContextMenu";

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

const WellheadNode = React.memo((props: Node) => {
  const { data } = props;
  const { forecastData, position } = data;
  const { showPopover, currentPopoverId } = useSelector(
    (state: RootState) => state.networkReducer
  );

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
