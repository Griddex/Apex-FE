import CallReceivedIcon from "@mui/icons-material/CallReceived";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Button } from "@mui/material";
import React from "react";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import { ApexNewWindow } from "../../../Application/Components/NewWindows/ApexNewWindow";
import ApexRadioGroup from "../../../Application/Components/Radios/ApexRadioGroup";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { THeatMapThreshold } from "../../../Economics/Components/ApexHeatMapThreshold/ApexHeatMapThreshold";
import { TChartStory, TChartTypes } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContextProvider } from "../Contexts/ChartFormatAggregatorContext";
import ChartFormatAggregator from "../FormatAggregators/ChartFormatAggregator";
import { IAction } from "./../../../Application/Redux/Actions/ActionTypes";

export interface IVisualyticsContext {
  reducer: ReducersType;
  currentThresholdTitle?: THeatMapThreshold;
  basePath: string;
  updateParameterAction: (path: string, value: any) => IAction;
  chartType: TChartTypes;
  openContextWindow: boolean;
  setOpenContextWindow: TUseState<boolean>;
}

const VisualyticsContext = ({
  reducer,
  currentThresholdTitle,
  chartType,
  basePath,
  updateParameterAction,
  openContextWindow,
  setOpenContextWindow,
}: IVisualyticsContext) => {
  const [chartStory, setChartStory] = React.useState("primary");
  const chartStoryData = [
    {
      value: "primary",
      label: "Primary",
      handleCheck: () => {},
    },
    {
      value: "secondary",
      label: "Secondary",
      handleCheck: () => {},
    },
  ];

  return (
    <ContextDrawer iconReplacement={<DetailsOutlinedIcon />}>
      {() => (
        <ChartFormatAggregatorContextProvider
          reducer={reducer}
          chartStory={chartStory as TChartStory}
        >
          {
            <ApexFlexContainer
              flexDirection="column"
              justifyContent="flex-start"
            >
              <Button
                style={{
                  marginTop: 20,
                  transform: "rotate(0deg) rotate(90deg)",
                  height: 30,
                }}
                variant="contained"
                color={openContextWindow ? "secondary" : "primary"}
                size="small"
                endIcon={
                  openContextWindow ? (
                    <CallReceivedIcon />
                  ) : (
                    <OpenInNewOutlinedIcon />
                  )
                }
                onClick={() => {
                  setOpenContextWindow(!openContextWindow);
                }}
              >
                Format
              </Button>
              {openContextWindow && (
                <ApexNewWindow
                  closeWindowPortal={() => {
                    setOpenContextWindow(false);
                  }}
                >
                  <ApexFlexContainer
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <ApexRadioGroup
                      apexRadioGroupData={chartStoryData}
                      selectedVariable={chartStory}
                      setSelectedVariable={setChartStory}
                    />
                    <ChartFormatAggregator
                      currentThresholdTitle={currentThresholdTitle}
                      basePath={basePath}
                      updateParameterAction={updateParameterAction}
                      chartType={chartType as TChartTypes}
                    />
                  </ApexFlexContainer>
                </ApexNewWindow>
              )}
            </ApexFlexContainer>
          }
        </ChartFormatAggregatorContextProvider>
      )}
    </ContextDrawer>
  );
};

export default React.memo(VisualyticsContext);
