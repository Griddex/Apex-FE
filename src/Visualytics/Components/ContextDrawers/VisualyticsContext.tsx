import CallReceivedIcon from "@mui/icons-material/CallReceived";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Button } from "@mui/material";
import React from "react";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import { ApexNewWindow } from "../../../Application/Components/NewWindows/ApexNewWindow";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { THeatMapThreshold } from "../../../Economics/Components/ApexHeatMapThreshold/ApexHeatMapThreshold";
import { TChartTypes } from "../Charts/ChartTypes";
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
  return (
    <ContextDrawer iconReplacement={<DetailsOutlinedIcon />}>
      {() => (
        <ChartFormatAggregatorContextProvider reducer={reducer}>
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
                  <ChartFormatAggregator
                    currentThresholdTitle={currentThresholdTitle}
                    basePath={basePath}
                    updateParameterAction={updateParameterAction}
                    chartType={chartType as TChartTypes}
                  />
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
