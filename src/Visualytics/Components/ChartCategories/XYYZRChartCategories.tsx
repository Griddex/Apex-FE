import { useTheme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IChartCategories } from "./ChartCategoryTypes";
import XChartCategory from "./XChartCategory";
import ZChartCategory from "./ZChartCategory";
import YChartCategory from "./YChartCategory";
import { TChartTypes } from "../Charts/ChartTypes";
import RChartCategory from "./RChartCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const XYYZRChartCategories = ({
  reducer,
  chartType,
  xCategoryOptionTitle,
  yCategoryOptionTitle,
  ySecondaryCategoryOptionTitle,
  zCategoryOptionTitle,
  rCategoryOptionTitle,
  disableX,
  disableY,
  disableSecondaryY,
  disableZ,
  disableR,
  updateAction,
  removeAction,
  showXCategoryMembersSwitch,
  showYCategoryMembersSwitch,
  showYSecondaryCategoryMembersSwitch,
  showZCategoryMembersSwitch,
  showRCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
  updateDragItemsAction,
  updateHasDroppedAction,
  categoryDragItemsTitle,
  categoryDragItems,
  categoryHasDroppedTitle,
  categoryHasDropped,
  categoryPanelWidth,
  categoryPanelComponent,
  resultsTitle,
}: IChartCategories) => {
  const classes = useStyles();
  const theme = useTheme();

  const chartTypeDefined = chartType as TChartTypes;
  const CategoryPanelComponent = categoryPanelComponent as JSX.Element;

  const categoryDetailsStyle = {
    width: categoryPanelWidth,
    height: "100%",
    moreStyles: {
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
    },
  };

  const XYY = ["stackedAreaChart", "lineChart", "barChart", "scatterChart"];
  const XYZ = ["heatMapChart"];
  const XYR = ["doughnutChart", "radarChart"];

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
    <ApexFlexContainer className={classes.root}>
      <ApexFlexContainer flexDirection="column" height={"100%"}>
        {[...XYY, ...XYZ, ...XYR].includes(chartTypeDefined) && (
          <XChartCategory
            reducer={reducer}
            categoryOptionTitle={xCategoryOptionTitle as string}
            updateAction={updateAction}
            removeAction={removeAction}
            disable={disableX}
            showCategoryMembersSwitch={showXCategoryMembersSwitch}
            showCategoryMembersObj={showCategoryMembersObj}
            path={path}
            updateParameterAction={updateParameterAction}
            updateDragItemsAction={updateDragItemsAction}
            updateHasDroppedAction={updateHasDroppedAction}
            categoryDragItem={
              categoryDragItems && categoryDragItems["X Category"]
            }
            categoryDropped={
              categoryHasDropped && categoryHasDropped["X Category"]
            }
            categoryDragItemsTitle={categoryDragItemsTitle}
            categoryHasDroppedTitle={categoryHasDroppedTitle}
            resultsTitle={resultsTitle}
          />
        )}
        {[...XYY, ...XYZ, ...XYR].includes(chartTypeDefined) && (
          <YChartCategory
            reducer={reducer}
            categoryOptionTitle={yCategoryOptionTitle as string}
            updateAction={updateAction}
            removeAction={removeAction}
            disable={disableY}
            showCategoryMembersSwitch={showYCategoryMembersSwitch}
            showCategoryMembersObj={showCategoryMembersObj}
            path={path}
            updateParameterAction={updateParameterAction}
            updateDragItemsAction={updateDragItemsAction}
            updateHasDroppedAction={updateHasDroppedAction}
            categoryDragItem={
              categoryDragItems && categoryDragItems["Y Category"]
            }
            categoryDropped={
              categoryHasDropped && categoryHasDropped["Y Category"]
            }
            categoryDragItemsTitle={categoryDragItemsTitle}
            categoryHasDroppedTitle={categoryHasDroppedTitle}
            resultsTitle={resultsTitle}
          />
        )}
        {XYY.includes(chartTypeDefined) && (
          <YChartCategory
            reducer={reducer}
            categoryOptionTitle={ySecondaryCategoryOptionTitle as string}
            updateAction={updateAction}
            removeAction={removeAction}
            disable={disableSecondaryY}
            showCategoryMembersSwitch={showYSecondaryCategoryMembersSwitch}
            showCategoryMembersObj={showCategoryMembersObj}
            path={path}
            updateParameterAction={updateParameterAction}
            updateDragItemsAction={updateDragItemsAction}
            updateHasDroppedAction={updateHasDroppedAction}
            categoryDragItem={
              categoryDragItems && categoryDragItems["Y Secondary Category"]
            }
            categoryDropped={
              categoryHasDropped && categoryHasDropped["Y Secondary Category"]
            }
            categoryDragItemsTitle={categoryDragItemsTitle}
            categoryHasDroppedTitle={categoryHasDroppedTitle}
            resultsTitle={resultsTitle}
          />
        )}
        {XYZ.includes(chartTypeDefined) && (
          <ZChartCategory
            reducer={reducer}
            categoryOptionTitle={zCategoryOptionTitle as string}
            updateAction={updateAction}
            removeAction={removeAction}
            disable={disableZ}
            showCategoryMembersSwitch={showZCategoryMembersSwitch}
            showCategoryMembersObj={showCategoryMembersObj}
            path={path}
            updateParameterAction={updateParameterAction}
            updateDragItemsAction={updateDragItemsAction}
            updateHasDroppedAction={updateHasDroppedAction}
            categoryDragItem={
              categoryDragItems && categoryDragItems["Z Category"]
            }
            categoryDropped={
              categoryHasDropped && categoryHasDropped["Z Category"]
            }
            categoryDragItemsTitle={categoryDragItemsTitle}
            categoryHasDroppedTitle={categoryHasDroppedTitle}
            resultsTitle={resultsTitle}
          />
        )}
        {XYR.includes(chartTypeDefined) && (
          <RChartCategory
            reducer={reducer}
            categoryOptionTitle={rCategoryOptionTitle as string}
            updateAction={updateAction}
            removeAction={removeAction}
            disable={disableR}
            showCategoryMembersSwitch={showRCategoryMembersSwitch}
            showCategoryMembersObj={showCategoryMembersObj}
            path={path}
            updateParameterAction={updateParameterAction}
            updateDragItemsAction={updateDragItemsAction}
            updateHasDroppedAction={updateHasDroppedAction}
            categoryDragItem={
              categoryDragItems && categoryDragItems["R Category"]
            }
            categoryDropped={
              categoryHasDropped && categoryHasDropped["R Category"]
            }
            categoryDragItemsTitle={categoryDragItemsTitle}
            categoryHasDroppedTitle={categoryHasDroppedTitle}
            resultsTitle={resultsTitle}
          />
        )}
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
      {(showCategoryMembersObj as Record<string, boolean>)[
        "Y Secondary Category"
      ] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          {"Y Secondary variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["R Category"] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          {"R variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["Z Category"] && (
        <ApexFlexContainer {...categoryDetailsStyle}>
          {CategoryPanelComponent}
        </ApexFlexContainer>
      )}
    </ApexFlexContainer>
  );
};

export default XYYZRChartCategories;
