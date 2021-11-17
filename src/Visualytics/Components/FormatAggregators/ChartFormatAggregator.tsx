import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { axisNameTitlesObj, TAxisType } from "../../Data/VisualyticsData";
import {
  bar_htm,
  dht,
  lin,
  rad,
  stk_lin_bar_sct_htm,
  stk_rad,
} from "../../Utils/ChartFormatDiscriminators";
import ApexArcLabels from "../ArcLabels/ApexArcLabels";
import ApexArcLinkLabels from "../ArcLabels/ApexArcLinkLabels";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import { TAxisName } from "../ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexChartDots from "../Dots/ApexChartDots";
import ApexRadarGrid from "../Grids/ApexRadarGrid";
import ApexChartInteractivity from "../Interactivity/ApexChartInteractivity";
import ApexLabels from "../Labels/ApexLabels";
import ApexLegends from "../Legends/ApexLegends";
import ApexPlotStyle from "../PlotStyle/ApexPlotStyle";
import ApexChartPointers from "../Pointers/ApexChartPoints";
import ApexChartSeries from "../Series/ApexChartSeries";
import { IApexFormatAggregator } from "./FormatAggregatorTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  toggle: { width: "100%", height: 40 },
}));

const ChartFormatAggregator = ({
  basePath,
  updateParameterAction,
  chartType,
}: IApexFormatAggregator) => {
  const theme = useTheme();
  const classes = useStyles();

  const chartTypeDefined = chartType as string;

  const { chartProps } = React.useContext(ChartFormatAggregatorContext);

  const { enableApexAxes, enableGridX, enableGridY, gridXValues, gridYValues } =
    chartProps;

  const [perspective, setPerspective] = React.useState("series");

  const handleChange = (_: React.ChangeEvent<any>, value: string) =>
    setPerspective(value);

  const apexChartGridData = React.useMemo(
    () => [
      {
        gridName: "gridX",
        gridTitle: "Horizontal Grid",
        enableGrid: enableGridX,
        gridValuesName: "gridXValues",
        gridValues: gridXValues,
      },
      {
        gridName: "gridY",
        gridTitle: "Vertical Grid",
        enableGrid: enableGridY,
        gridValuesName: "gridYValues",
        gridValues: gridYValues,
      },
    ],
    [JSON.stringify(gridXValues), JSON.stringify(gridYValues)]
  );

  const apexChartAxesData = React.useMemo(
    () =>
      Object.keys(axisNameTitlesObj).map((name) => ({
        axisName: name,
        axisCaption: "Chart Axes",
        enableName: `${name}Enable`,
        axisEnabled: enableApexAxes[name as TAxisName],
      })),
    [JSON.stringify(enableApexAxes)]
  );

  const apexMultiAccordionsData = React.useMemo(
    () =>
      Object.keys(axisNameTitlesObj).map((name) => ({
        name: `${name}Accordion`,
        title: axisNameTitlesObj[name as TAxisType],
        content: <ApexFlexContainer>No Content</ApexFlexContainer>,
      })),
    []
  );

  const apexChartProps = React.useMemo(
    () => ({
      basePath,
      updateParameterAction,
      chartType,
    }),
    [basePath, chartType]
  );

  const apexGridAxesProps = React.useMemo(
    () => ({
      basePath,
      updateParameterAction,
      chartType,
      apexChartGridData,
      apexChartAxesData,
      apexMultiAccordionsData,
    }),
    [basePath, chartType, apexChartGridData, apexChartAxesData]
  );

  const renderFormatPerspective = () => {
    switch (perspective) {
      case "series":
        return <ApexChartSeries {...apexChartProps} />;

      case "plot":
        return <ApexPlotStyle {...apexChartProps} />;

      case "gridAxes":
        return <ApexChartGridAxes {...apexGridAxesProps} />;

      case "radarGrid":
        return <ApexRadarGrid {...apexGridAxesProps} />;

      case "labels": //bar & htm
        return <ApexLabels {...apexChartProps} />;

      case "points": //line
        return <ApexChartPointers {...apexChartProps} />;

      case "dots": //stk & rad
        return <ApexChartDots {...apexChartProps} />;

      case "arcLabels": //dht
        return <ApexArcLabels {...apexChartProps} />;

      case "arcLinkLabels": //dht
        return <ApexArcLinkLabels {...apexChartProps} />;

      case "legends":
        return <ApexLegends {...apexChartProps} />;

      case "interactivity":
        return <ApexChartInteractivity {...apexChartProps} />;

      default:
        break;
    }
  };

  if ((chartType as string) === "Select Chart...") {
    return (
      <ApexFlexContainer
        className={classes.root}
        moreStyles={{ backgroundColor: theme.palette.grey["200"] }}
      >
        {"Select Chart"}
      </ApexFlexContainer>
    );
  }

  return (
    <ApexFlexContainer flexDirection="column">
      <ToggleButtonGroup
        size="small"
        value={perspective}
        onChange={handleChange}
        style={{ width: "100%" }}
        exclusive
      >
        <ToggleButton className={classes.toggle} value="series">
          {"Series"}
        </ToggleButton>
        <ToggleButton className={classes.toggle} value="plot">
          {"Plot"}
        </ToggleButton>
        {stk_lin_bar_sct_htm.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="gridAxes">
            {"Grids & Axes"}
          </ToggleButton>
        )}
        {rad.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="radarGrid">
            {"Radar Grid"}
          </ToggleButton>
        )}
        {lin.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="points">
            {"Points"}
          </ToggleButton>
        )}
        {stk_rad.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="dots">
            {"Dots"}
          </ToggleButton>
        )}
        {bar_htm.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="labels">
            {"Labels"}
          </ToggleButton>
        )}
        {dht.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="arcLabels">
            {"Arc labels"}
          </ToggleButton>
        )}
        {dht.includes(chartTypeDefined) && (
          <ToggleButton className={classes.toggle} value="arcLinkLabels">
            {"Arc Link Labels"}
          </ToggleButton>
        )}
        <ToggleButton className={classes.toggle} value="legends">
          {"Legends"}
        </ToggleButton>
        <ToggleButton className={classes.toggle} value="interactivity">
          {"Interactivity"}
        </ToggleButton>
      </ToggleButtonGroup>
      <ApexFlexContainer
        alignItems="flex-start"
        moreStyles={{ flexWrap: "wrap" }}
      >
        {renderFormatPerspective()}
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default ChartFormatAggregator;
