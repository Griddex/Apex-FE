import { makeStyles } from "@material-ui/core";
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
}: IChartCategories) => {
  console.log(
    "Logged output --> ~ file: XYZChartCategories.tsx ~ line 32 ~ showCategoryMembersObj",
    showCategoryMembersObj
  );
  const classes = useStyles();

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
        />
      </ApexFlexContainer>
      {(showCategoryMembersObj as Record<string, boolean>)["X Category"] && (
        <ApexFlexContainer width={150} height={"100%"}>
          {"X variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["Y Category"] && (
        <ApexFlexContainer width={150} height={"100%"}>
          {"Y variable"}
        </ApexFlexContainer>
      )}
      {(showCategoryMembersObj as Record<string, boolean>)["Z Category"] && (
        <ApexFlexContainer width={150} height={"100%"}>
          {"Z variable"}
        </ApexFlexContainer>
      )}
    </ApexFlexContainer>
  );
};

export default React.memo(XYZChartCategories);
