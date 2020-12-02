import { Handle, Node, Position } from "react-flow-renderer";
import React from "react";
import Wellhead from "../../Images/Wellhead.svg";
import WellheadContextMenu from "../ContextMenu/WellheadContextMenu";

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
        padding: "5px",
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
        <div style={{ width: "100%", height: "50%", fontSize: "10" }}>
          {forecastData.length}
        </div>
        <div style={{ width: "100%", height: "50%", fontSize: "10" }}>
          Wellheads
        </div>
      </div>
    </div>
  );
};

const WellheadSummaryNode = React.memo((props: Node) => {
  const { data } = props;
  const { forecastData, position } = data;

  return (
    <WellheadContextMenu position={position}>
      <WellheadSummaryWidget forecastData={forecastData} />
    </WellheadContextMenu>
  );
});

export default WellheadSummaryNode;
