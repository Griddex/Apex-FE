import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import React from "react";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import DrainagePointSummaryContextMenu from "../ContextMenu/DrainagePointSummaryContextMenu";
import { Typography } from "@material-ui/core";
import {
  handleStyle,
  drainagePointSummaryInnerStyle,
  drainagePointSummaryTextStyle,
  drainagePointSummaryWidgetStyle,
} from "./WidgetStyles";
import { IExtraNodeProps } from "./WidgetTypes";

const DrainagePointSummaryWidget = ({
  drainagePoints,
}: {
  drainagePoints: string[];
}) => {
  return (
    <div style={drainagePointSummaryWidgetStyle}>
      <Handle type="source" position={Position.Top} style={handleStyle} />
      <img
        src={DrainagePoint}
        width={20}
        height={20}
        draggable={false}
        alt="DrainagePoint"
      />
      <div style={drainagePointSummaryTextStyle}>
        <div style={drainagePointSummaryInnerStyle}>
          <Typography variant="caption">{drainagePoints.length}</Typography>
        </div>
        <div style={drainagePointSummaryInnerStyle}>
          <Typography style={{ fontSize: 8 }} variant="caption">
            Wells
          </Typography>
        </div>
      </div>
    </div>
  );
};

const DrainagePointSummaryNode = React.memo((props: Node & IExtraNodeProps) => {
  console.log(
    "Logged output --> ~ file: DrainagePointSummaryWidget.tsx ~ line 43 ~ DrainagePointSummaryNode ~ props",
    props
  );
  const {
    xPos,
    yPos,
    data: { drainagePoints },
  } = props;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <DrainagePointSummaryContextMenu position={position}>
      <DrainagePointSummaryWidget drainagePoints={drainagePoints} />
    </DrainagePointSummaryContextMenu>
  );
});

export default DrainagePointSummaryNode;
