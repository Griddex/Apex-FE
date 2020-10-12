import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import React from "react";
import ChartTabsWrapper from "./ChartTabsWrapper";
import FillBorderOptions from "./FillBorderOptions";
import { useSelector } from "react-redux";

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

const chartElements = {
  none: null,
  chartLayout: "Chart Layout",
  charplotArea: "Plot Area",
  Legend: "Legend",
  yAxis: "Y Axis",
  xAxis: "X Axis",
  axisTitle: "Axis Title",
  chartTitle: "Chart Title",
  dataLabels: "Data Labels",
  dataPoint: "Data Point",
  dataSeries: "Data Series",
  gridLines: "Grid Lines",
};

const chartItemsContent = {
  none: null,
  chartLayout: {
    subContextTabs: [
      { name: "ColorFormatting", icon: () => <FormatColorFillIcon /> },
      { name: "OtherFormatting", icon: () => <ViewCarouselIcon /> },
    ],
    subContextTabPanels: [
      { name: "ColorFormatting", component: <FillBorderOptions /> },
      { name: "OtherFormatting", component: <FillBorderOptions /> },
    ],
  },
};

export default function FormatAggregator() {
  const classes = useStyles();

  const { chartElementType } = useSelector(
    (state) => state.chartReducer.selectedChartElementId
  );
  const header = chartElements[chartElementType];

  return (
    <div className={classes.rootFormatAggregator}>
      <Typography className={classes.heading} variant="caption">
        {header && header.toUpperCase()}
      </Typography>
      {header ? (
        <ChartTabsWrapper
          chartItemsContent={chartItemsContent[chartElementType]}
        />
      ) : (
        <div>Chart</div>
      )}
    </div>
  );
}
