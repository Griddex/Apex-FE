import { Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import Image from "../../../Application/Components/Visuals/Image";
import barChart from "../../Images/barChart.svg";
import bubble from "../../Images/bubble.svg";
import doughnutChart from "../../Images/doughnutChart.svg";
import lineChart from "../../Images/lineChart.svg";
import pie from "../../Images/pie.svg";
import radarChart from "../../Images/radarChart.svg";
import scatterChart from "../../Images/scatterChart.svg";
import stackedAreaChart from "../../Images/stackedAreaChart.svg";
import stock from "../../Images/stock.svg";
import { TChartStory } from "../Charts/ChartTypes";

interface IChartTypeWidget {
  chartStory: TChartStory;
  chartTypeState: "icon" | "full";
  chartTypeOptions?: ISelectOption[];
  chartTypeSecondaryOptions?: ISelectOption[];
  selectedOption: ISelectOption;
  action: (chartOption: ISelectOption) => void;
}

const useStyles = makeStyles((theme) => ({
  divImage: { height: 36, width: 36, marginRight: 4 },
  image: { height: "auto", width: "auto" },
}));

const chartTypeWidgets = [
  {
    name: "stackedAreaChart",
    label: "StackedAreaChart",
    svg: stackedAreaChart,
    chartTypeState: "icon",
  },
  {
    name: "barChart",
    label: "BarChart",
    svg: barChart,
    chartTypeState: "icon",
  },
  {
    name: "bubble",
    label: "Bubble",
    svg: bubble,
    chartTypeState: "icon",
  },
  {
    name: "doughnutChart",
    label: "DoughnutChart",
    svg: doughnutChart,
    chartTypeState: "icon",
  },
  {
    name: "lineChart",
    label: "LineChart",
    svg: lineChart,
    chartTypeState: "icon",
  },
  {
    name: "pie",
    label: "Pie",
    svg: pie,
    chartTypeState: "icon",
  },
  {
    name: "radarChart",
    label: "RadarChart",
    svg: radarChart,
    chartTypeState: "icon",
  },
  {
    name: "scatterChart",
    label: "ScatterChart",
    svg: scatterChart,
    chartTypeState: "icon",
  },
  {
    name: "stock",
    label: "Stock",
    svg: stock,
    chartTypeState: "icon",
  },
];

const ChartTypeWidget = ({
  chartStory,
  chartTypeState,
  chartTypeOptions,
  chartTypeSecondaryOptions,
  selectedOption,
  action,
}: IChartTypeWidget) => {
  const classes = useStyles();
  const theme = useTheme();

  const chartTypes = chartTypeOptions?.map((cht) => cht.value);
  const chartTypesSecondary = chartTypeSecondaryOptions?.map(
    (cht) => cht.value
  );

  const chartTypeWidgetsChartTypeState = chartTypeWidgets
    .filter((o) => chartTypes?.includes(o.name))
    .map((row) => {
      row["chartTypeState"] = chartTypeState ? chartTypeState : "icon";
      return row;
    });

  const chartTypeWidgetsSecondaryChartTypeState = chartTypeWidgets
    .filter((o) => chartTypesSecondary?.includes(o.name))
    .map((row) => {
      row["chartTypeState"] = chartTypeState ? chartTypeState : "icon";
      return row;
    });

  const chartTypeWidgetsChartStory =
    chartStory === "primary"
      ? chartTypeWidgetsChartTypeState
      : chartTypeWidgetsSecondaryChartTypeState;

  const chartOptions =
    chartStory === "primary" ? chartTypeOptions : chartTypeSecondaryOptions;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
      }}
    >
      {chartTypeWidgetsChartStory.map((row) => (
        <Tooltip key={row?.name} title={row?.label as string} arrow>
          <div
            style={
              selectedOption.value === row?.name
                ? {
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.primary.light,
                    width: 36,
                    height: 36,
                    marginRight: 5,
                    cursor: "pointer",
                  }
                : { width: 36, height: 36, marginRight: 5, cursor: "pointer" }
            }
            onClick={() => {
              const option = chartOptions?.find(
                (o) => o.value === row?.name
              ) as ISelectOption;
              action(option);
            }}
          >
            <Image
              className={classes.image}
              src={row?.svg}
              alt="Hydrocarbon Forecasting Platform Company Logo"
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ChartTypeWidget;
