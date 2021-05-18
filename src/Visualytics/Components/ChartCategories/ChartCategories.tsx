import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import Category from "./ChartCategory";

const ChartCategories = () => {
  const ChartCategoriesData = [
    {
      title: "X Category",
    },
    {
      title: "Y Category",
    },
    {
      title: "Z Category",
    },
    {
      title: "Filter",
    },
    {
      title: "Color",
    },
  ];

  return (
    <CenteredStyle flexDirection="column" width={300}>
      {ChartCategoriesData.map((props, i) => (
        <Category key={i} {...props} />
      ))}
    </CenteredStyle>
  );
};

export default ChartCategories;
