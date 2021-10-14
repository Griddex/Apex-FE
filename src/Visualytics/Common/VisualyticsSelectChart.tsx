import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getVisualyticsChartDataRequestAction } from "../Redux/Actions/VisualyticsActions";
import SelectChart from "./SelectChart";

const visualyticsVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsVariableXOptions,
  (load) => load
);

const VisualyticsSelectChart = () => {
  const reducer = "visualyticsReducer";
  const wc = "visualyticsChartsWorkflows";

  const dispatch = useDispatch();

  const visualyticsVariableXOptions = useSelector(
    visualyticsVariableXOptionsSelector
  );

  return (
    <ApexFlexContainer flexDirection="column">
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedVisualyticsChartOption"
      />
      <ApexFlexContainer
        justifyContent="space-evenly"
        height={50}
        moreStyles={{ marginBottom: 4, width: 270 }}
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
    </ApexFlexContainer>
  );
};

export default VisualyticsSelectChart;
