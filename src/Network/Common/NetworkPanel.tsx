import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import NodePanel from "../Components/Nodes/NodePanel";

const useStyles = makeStyles(() => ({
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

const NetworkPanel = () => {
  const classes = useStyles();

  const nodeNames = [
    "wellhead",
    "manifold",
    "flowstation",
    "gasFacility",
    "gatheringCenter",
    "terminal",
  ];

  const renderNetworkPanel = () => {
    return (
      <>
        {nodeNames.map((nodeName, i) => (
          <NodePanel key={i} name={nodeName} />
        ))}
      </>
    );
  };

  return (
    <>
      <AnalyticsTitle title="Network Nodes" />
      <div className={classes.networkPanel}>{renderNetworkPanel()}</div>
    </>
  );
};

export default NetworkPanel;
