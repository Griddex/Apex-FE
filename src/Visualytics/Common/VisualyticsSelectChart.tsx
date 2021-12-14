import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getVisualyticsChartDataRequestAction } from "../Redux/Actions/VisualyticsActions";
import { TSize } from "../../Application/Types/ApplicationTypes";

const SelectChart = React.lazy(() => import("./SelectChart"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const visualyticsVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsVariableXOptions,
  (load) => load
);

const VisualyticsSelectChart = ({ width, height }: TSize) => {
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
        indexBy={indexBy}
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
