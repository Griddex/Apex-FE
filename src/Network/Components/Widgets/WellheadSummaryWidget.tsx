import { Handle, Node, Position } from "react-flow-renderer";
import React from "react";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadSummaryContextMenu from "../ContextMenu/WellheadSummaryContextMenu";
import { Typography } from "@material-ui/core";
import {
  handleStyle,
  wellheadeSummaryInnerStyle,
  wellheadeSummaryTextStyle,
  wellheadSummaryWidgetStyle,
} from "./WidgetStyles";

const WellheadSummaryWidget = ({
  forecastData,
}: {
  forecastData: Record<string, unknown>[];
}) => {
  return (
    <div style={wellheadSummaryWidgetStyle}>
      <Handle type="source" position={Position.Top} style={handleStyle} />
      <img
        src={Wellhead}
        width={20}
        height={20}
        draggable={false}
        alt="Wellhead"
      />
      <div style={wellheadeSummaryTextStyle}>
        <div style={wellheadeSummaryInnerStyle}>
          <Typography variant="caption">{forecastData.length}</Typography>
        </div>
        <div style={wellheadeSummaryInnerStyle}>
          <Typography style={{ fontSize: 8 }} variant="caption">
            Wells
          </Typography>
        </div>
      </div>
    </div>
  );
};

const WellheadSummaryNode = React.memo((props: Node) => {
  const { data } = props;
  const { forecastData, position } = data;

  return (
    <WellheadSummaryContextMenu position={position}>
      <WellheadSummaryWidget forecastData={forecastData} />
    </WellheadSummaryContextMenu>
  );
});

export default WellheadSummaryNode;
