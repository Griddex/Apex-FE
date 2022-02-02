import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartStory } from "../Components/Charts/ChartTypes";
import { getVisualyticsChartDataRequestAction } from "../Redux/Actions/VisualyticsActions";

const SelectChart = React.lazy(() => import("./SelectChart"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const visualyticsVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsVariableXOptions,
  (load) => load
);

export interface IVisualyticsSelectChart {
  height: number;
  width: number;
  chartStory: TChartStory;
}

const VisualyticsSelectChart = ({
  width,
  height,
  chartStory,
}: IVisualyticsSelectChart) => {
  const reducer = "visualyticsReducer";
  const wc = "visualyticsChartsWorkflows";

  const dispatch = useDispatch();

  const visualyticsVariableXOptions = useSelector(
    visualyticsVariableXOptionsSelector
  );

  const indexByKey = Object.keys(visualyticsVariableXOptions)[0];
  const indexBy = visualyticsVariableXOptions[indexByKey]?.name;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: width,
        height: height,
      }}
    >
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedVisualyticsChartOption"
        selectedSecondaryChartOptionTitle="selectedVisualyticsSecondaryChartOption"
        indexBy={indexBy}
        chartStory={chartStory}
      />
      <ApexFlexContainer
        justifyContent="space-evenly"
        height={50}
        moreStyles={{ marginBottom: 4, width: 270, alignSelf: "center" }}
      >
        <BaseButtons
          buttonTexts={["Reset", "Display"]}
          variants={["contained", "contained"]}
          colors={["secondary", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <AirplayOutlinedIcon key={2} />,
          ]}
          disableds={[false, visualyticsVariableXOptions === null]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {},
            () => dispatch(getVisualyticsChartDataRequestAction(reducer, wc)),
          ]}
        />
      </ApexFlexContainer>
    </div>
  );
};

export default VisualyticsSelectChart;
