import { makeStyles } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IChartCategories } from "./ChartCategoryTypes";
import XChartCategory from "./XChartCategory";
import YChartCategory from "./YChartCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex: 1300,
  },
}));

const XYZChartCategories = ({
  xCategoryOptionTitle,
  yCategoryOptionTitle,
  zCategoryOptionTitle,
  disableX,
  disableY,
  disableZ,
  updateAction,
  removeAction,
}: IChartCategories) => {
  const classes = useStyles();

  return (
    <ApexFlexContainer
      className={classes.root}
      flexDirection="column"
      width={300}
      height="fit-content"
    >
      <XChartCategory
        xCategoryOptionTitle={xCategoryOptionTitle}
        updateAction={updateAction}
        removeAction={removeAction}
        disable={disableX}
      />
      <YChartCategory
        yCategoryOptionTitle={yCategoryOptionTitle}
        updateAction={updateAction}
        removeAction={removeAction}
        disable={disableY}
      />
      <YChartCategory
        yCategoryOptionTitle={zCategoryOptionTitle}
        updateAction={updateAction}
        removeAction={removeAction}
        disable={disableZ}
      />
    </ApexFlexContainer>
  );
};

export default React.memo(XYZChartCategories);
