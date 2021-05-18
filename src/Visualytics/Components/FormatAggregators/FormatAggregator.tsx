import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import React from "react";
import ChartTabsWrapper from "../TabsWrappers/ChartTabsWrapper";
import FillBorderOptions from "./FillBorderOptions";
import { useSelector } from "react-redux";
import { IChartObjContent } from "./FormatAggregatorTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { chartObjectsNameTitleMap } from "../../Redux/ChartState/ChartState";
import { IChartObject } from "../../Redux/ChartState/ChartStateTypes";

const useStyles = makeStyles((theme) => ({
  rootFormatAggregator: {
    width: "100%",
    height: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const chartObjsContent: IChartObjContent = {
  none: null,
  chartLayout: {
    subContextTabs: [
      { name: "ColorFormatting", icon: () => <FormatColorFillIcon /> },
      { name: "OtherFormatting", icon: () => <ViewCarouselIcon /> },
    ],
    subContextTabPanels: [
      { name: "ColorFormatting", component: () => <FillBorderOptions /> },
      { name: "OtherFormatting", component: () => <FillBorderOptions /> },
    ],
  },
};

export default function FormatAggregator() {
  const classes = useStyles();

  const { selectedChartObjId, chartObjects } = useSelector(
    (state: RootState) => state.chartReducer
  );
  const chartObj = chartObjects.find(
    (o) => o.chartObjId === selectedChartObjId
  ) as NonNullable<IChartObject>;

  let title = "";
  let content = {} as IChartObjContent;
  if (chartObj) {
    const { chartObjName } = chartObj;
    title = chartObjectsNameTitleMap[chartObjName];
    content = chartObjsContent[chartObjName] as IChartObjContent;
    // const nonNullableContent = chartObjsContent[chartObjName] as NonNullable<
    //   typeof content
    // >;
  }

  return (
    <div className={classes.rootFormatAggregator}>
      <Typography className={classes.heading} variant="caption">
        {title && title.toUpperCase()}
      </Typography>
      {title ? (
        <ChartTabsWrapper
          chartObjsContent={chartObjsContent}
          chartObjName={"chartLayout"}
        />
      ) : (
        <div>Chart</div>
      )}
    </div>
  );
}
