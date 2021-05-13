import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ChartType } from "./ChartTypes";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  rootDoughnutChart: {
    marginTop: 10,
  },
}));

const DoughnutChart = ({ data }: { data: ChartType }) => {
  const theme = useTheme();

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      // colors={{ scheme: "category10" }}
      innerRadius={0.7}
      padAngle={0.7}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "full",
          type: "",
          background: "inherit",
          color: theme.palette.success.main,
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "partial",
          color: theme.palette.primary.main,
        },
        {
          id: "none",
          color: theme.palette.secondary.main,
        },
      ]}
      fill={[
        {
          match: {
            id: "Full Match",
          },
          id: "full",
        },
        {
          match: {
            id: "Partial Match",
          },
          id: "partial",
        },
        {
          match: {
            id: "No Match",
          },
          id: "none",
        },
      ]}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default DoughnutChart;
