import { Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import DrainagePointSummaryContextMenu from "../ContextMenu/DrainagePointSummaryContextMenu";
import {
  drainagePointSummaryInnerStyle,
  drainagePointSummaryTextStyle,
  drainagePointSummaryWidgetStyle,
  handleStyle,
} from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const DrainagePointSummaryTitle = ({ drainagePoints }: IWidget) => {
  const theme = useTheme();

  return (
    <AnalyticsComp
      title="Drainage Points"
      direction="Vertical"
      titleStyle={{ color: theme.palette.primary.main }}
      containerStyle={{ width: "100%" }}
      content={
        <ApexFlexContainer
          flexDirection="column"
          moreStyles={{
            width: 200,
            height: "auto",
            // maxHeight: 200,
            overflow: "auto",
          }}
        >
          {drainagePoints?.map((dp, i) => {
            return (
              <div key={i} style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: 20 }}>{`${i + 1}. `}</div>
                <div style={{ width: 180 }}>{dp}</div>
              </div>
            );
          })}
        </ApexFlexContainer>
      }
    />
  );
};

const DrainagePointSummaryWidget = ({ drainagePoints }: IWidget) => {
  const isValidConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "manifold";
  };

  return (
    <div style={drainagePointSummaryWidgetStyle}>
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        isValidConnection={isValidConnection}
      />
      <Tooltip
        key="drainagePointSummary"
        title={<DrainagePointSummaryTitle drainagePoints={drainagePoints} />}
        placement="bottom"
        arrow
        leaveDelay={5000}
      >
        <img
          src={DrainagePoint}
          width={20}
          height={20}
          draggable={false}
          alt="DrainagePoint"
        />
      </Tooltip>
      <div style={drainagePointSummaryTextStyle}>
        <div style={drainagePointSummaryInnerStyle}>
          <Typography variant="caption">
            {drainagePoints && drainagePoints.length}
          </Typography>
        </div>
        <div style={drainagePointSummaryInnerStyle}>
          <Typography style={{ fontSize: 8 }} variant="caption">
            DPs
          </Typography>
        </div>
      </div>
    </div>
  );
};

const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isAuto) => isAuto
);

const DrainagePointSummaryNode = React.memo((props: Node & IExtraNodeProps) => {
  const isNetworkAuto = useSelector(isNetworkAutoSelector);

  if (!isNetworkAuto) {
    props = {
      ...props,
      ["data"]: {
        drainagePoints: [],
      },
    };
  }

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
