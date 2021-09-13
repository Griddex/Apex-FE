import { Button } from "@material-ui/core";
import NewWindow from "rc-new-window";
import React from "react";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { TChartTypes } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContextProvider } from "../Contexts/ChartFormatAggregatorContext";
import ChartFormatAggregator from "../FormatAggregators/ChartFormatAggregator";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import DetailsOutlinedIcon from "@material-ui/icons/DetailsOutlined";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { IAction } from "./../../../Application/Redux/Actions/ActionTypes";

export interface IVisualyticsContext {
  reducer: ReducersType;
  basePath: string;
  updateParameterAction: (path: string, value: any) => IAction;
  chartType: TChartTypes;
  openContextWindow: boolean;
  setOpenContextWindow: TUseState<boolean>;
}

const VisualyticsContext = ({
  reducer,
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
                <NewWindow
                  onClose={() => {
                    setOpenContextWindow(false);
                  }}
                  copyStyles={true}
                  height={800}
                  width={490}
                >
                  <ChartFormatAggregator
                    basePath={basePath}
                    updateParameterAction={updateParameterAction}
                    chartType={chartType as TChartTypes}
                  />
                </NewWindow>
              )}
            </ApexFlexContainer>
          }
        </ChartFormatAggregatorContextProvider>
      )}
    </ContextDrawer>
  );
};

export default VisualyticsContext;
