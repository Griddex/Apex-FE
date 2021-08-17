import { makeStyles } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ChartCategory from "./ChartCategory";
import { IChartCategoriesData } from "./ChartCategoryTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex: 1300,
  },
}));

const ChartCategories = ({ chartCategoriesData }: IChartCategoriesData) => {
  const classes = useStyles();

  return (
    <ApexFlexContainer
      className={classes.root}
      flexDirection="column"
      width={300}
      height="fit-content"
    >
      {chartCategoriesData.map((props, i) => (
        <ChartCategory key={i} {...props} />
      ))}
    </ApexFlexContainer>
  );
};

export default React.memo(ChartCategories);
