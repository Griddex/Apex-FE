import { fade, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import ChartCategory from "./ChartCategory";
import { IChartCategoriesData } from "./ChartCategoryTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props: any) => (props.showCategories ? "flex" : "none"),
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex: 10,
    boxShadow: `${fade(theme.palette.grey[300], 0.25)} 0 0 0 2px`,
  },
}));

const ChartCategories = ({
  categoriesTitle,
  ChartCategoriesData,
  showCategories,
}: IChartCategoriesData) => {
  const classes = useStyles({ showCategories });

  console.log("Yello");

  return (
    <ApexFlexStyle
      className={classes.root}
      flexDirection="column"
      width={300}
      height="fit-content"
    >
      <Typography variant="h6" color="primary">
        {categoriesTitle}
      </Typography>
      {ChartCategoriesData.map((props, i) => (
        <ChartCategory key={i} {...props} />
      ))}
    </ApexFlexStyle>
  );
};

export default React.memo(ChartCategories);
