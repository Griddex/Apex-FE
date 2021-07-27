import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadContextMenu from "./../ContextMenu/WellheadContextMenu";
import WellheadPopover from "./../Popovers/WellheadPopover";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const WellheadWidget = ({ name }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="source" position={Position.Top} style={handleStyle} />
      <Tooltip key="flowstation" title={name} placement="bottom" arrow>
        <img
          src={Wellhead}
          width={20}
          height={20}
          draggable={false}
          alt="Wellhead"
        />
      </Tooltip>
    </div>
  );
};

const WellheadNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { forecastData, name } = data;
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
              <WellheadWidget name={name} />
            </WellheadContextMenu>
          </div>
        </WellheadPopover>
      ) : (
        <WellheadContextMenu position={position}>
          <WellheadWidget name={name} />
        </WellheadContextMenu>
      )}
    </>
  );
});

export default WellheadNode;
