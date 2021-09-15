import AirplayOutlinedIcon from "@material-ui/icons/AirplayOutlined";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getVisualyticsChartDataRequestAction } from "../Redux/Actions/VisualyticsActions";
import SelectChart from "./SelectChart";

const VisualyticsSelectChart = () => {
  const reducer = "visualyticsReducer";
  const wc = "visualyticsChartsWorkflows";

  const dispatch = useDispatch();

  const { visualyticsVariableXOptions } = useSelector(
    (state: RootState) => state.visualyticsReducer
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
