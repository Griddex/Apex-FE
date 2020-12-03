import { Handle, Node, Position } from "react-flow-renderer";
import React from "react";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadSummaryContextMenu from "../ContextMenu/WellheadSummaryContextMenu";
import { Typography } from "@material-ui/core";

const WellheadSummaryWidget = ({
  forecastData,
}: {
  forecastData: Record<string, unknown>[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        border: "1px solid #999",
        padding: "2px",
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
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={Wellhead}
          width={20}
          height={20}
          draggable={false}
          alt="Wellhead"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50%",
          }}
        >
          <Typography variant="caption">{forecastData.length}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50%",
          }}
        >
          <Typography style={{ fontSize: "8px" }} variant="caption">
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
