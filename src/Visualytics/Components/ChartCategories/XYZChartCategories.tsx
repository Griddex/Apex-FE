import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IChartCategories } from "./ChartCategoryTypes";
import XChartCategory from "./XChartCategory";
import ZChartCategory from "./ZChartCategory";
import YChartCategory from "./YChartCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
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
  showXCategoryMembersSwitch,
  showYCategoryMembersSwitch,
  showZCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
  categoryDragItems,
  categoryHasDropped,
  categoryPanelWidth,
  categoryPanelComponent,
}: IChartCategories) => {
  const classes = useStyles();
  const theme = useTheme();

  const CategoryPanelComponent = categoryPanelComponent as React.FC;

  const categoryDetailsStyle = {
    width: categoryPanelWidth,
    height: "100%",
    moreStyles: {
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
    },
  };

  return (
    <ApexFlexContainer className={classes.root}>
      <ApexFlexContainer flexDirection="column" height={"100%"}>
        <XChartCategory
          categoryOptionTitle={xCategoryOptionTitle as string}
          updateAction={updateAction}
          removeAction={removeAction}
          disable={disableX}
          showCategoryMembersSwitch={showXCategoryMembersSwitch}
          showCategoryMembersObj={showCategoryMembersObj}
          path={path}
          updateParameterAction={updateParameterAction}
          categoryDragItem={
            categoryDragItems && categoryDragItems["X Category"]
          }
          categoryDropped={
            categoryHasDropped && categoryHasDropped["X Category"]
          }
        />
        <YChartCategory
          categoryOptionTitle={yCategoryOptionTitle as string}
          updateAction={updateAction}
          removeAction={removeAction}
          disable={disableY}
          showCategoryMembersSwitch={showYCategoryMembersSwitch}
          showCategoryMembersObj={showCategoryMembersObj}
          path={path}
          updateParameterAction={updateParameterAction}
          categoryDragItem={
            categoryDragItems && categoryDragItems["Y Category"]
          }
          categoryDropped={
            categoryHasDropped && categoryHasDropped["Y Category"]
          }
        />
        <ZChartCategory
          categoryOptionTitle={zCategoryOptionTitle as string}
          updateAction={updateAction}
          removeAction={removeAction}
          disable={disableZ}
          showCategoryMembersSwitch={showZCategoryMembersSwitch}
          showCategoryMembersObj={showCategoryMembersObj}
          path={path}
          updateParameterAction={updateParameterAction}
          categoryDragItem={
            categoryDragItems && categoryDragItems["Z Category"]
          }
          categoryDropped={
            categoryHasDropped && categoryHasDropped["Z Category"]
          }
        />
      </ApexFlexContainer>
      {(showCategoryMembersObj as Record<string, boolean>)["X Category"] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          {"X variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["Y Category"] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          {"Y variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["Z Category"] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          <CategoryPanelComponent />
        </ApexFlexContainer>
      )}
    </ApexFlexContainer>
  );
};

export default XYZChartCategories;
