import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IChartCategories } from "./ChartCategoryTypes";
import XChartCategory from "./XChartCategory";
import YChartCategory from "./RChartCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex: 1300,
  },
}));

const XYChartCategories = ({
  xCategoryOptionTitle,
  yCategoryOptionTitle,
  disableX,
  disableY,
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
    </ApexFlexContainer>
  );
};

export default React.memo(XYChartCategories);
