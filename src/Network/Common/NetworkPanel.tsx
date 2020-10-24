import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import NodeTemplate from "../Components/Nodes/NodeTemplate";

const useStyles = makeStyles((theme) => ({
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
    // overflow: "auto",
  },
}));

export interface WellheadWidgetProps {
  model: any;
  color?: string;
  name?: string;
}

const NetworkPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
          <NodeTemplate key={i} name={nodeName} />
        ))}
      </>
    );
  };

  return (
    <>
      <AnalyticsTitle title="Network Diagram Panel" />
      <div className={classes.networkPanel}>{renderNetworkPanel()}</div>
    </>
  );
};

export default NetworkPanel;