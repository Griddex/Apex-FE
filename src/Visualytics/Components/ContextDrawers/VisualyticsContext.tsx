import { Button } from "@material-ui/core";
// import NewWindow from "rc-new-window";
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
import NewImprovedWindow from "react-new-improved-window";
import NewWindow from "react-new-window";
import { Rnd } from "react-rnd";
import DraggableDialog from "../../../Application/Components/Dialogs/DraggableDialog";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

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
  const [categorySizePosition, setCategorySizePosition] = React.useState({
    width: 385,
    height: 540,
    x: -300,
    y: 0,
  });

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
                // <Rnd
                //   style={{ zIndex: 2000, padding: 2 }}
                //   size={{
                //     width: categorySizePosition.width,
                //     height: categorySizePosition.height,
                //   }}
                //   position={{
                //     x: categorySizePosition.x,
                //     y: categorySizePosition.y,
                //   }}
                //   onDragStop={(e, d) =>
                //     setCategorySizePosition((prev) => ({
                //       ...prev,
                //       x: d.x,
                //       y: d.y,
                //     }))
                //   }
                //   onResizeStop={(e, direction, ref, delta, position) => {
                //     setCategorySizePosition({
                //       width: Number(ref.style.width),
                //       height: Number(ref.style.height),
                //       ...position,
                //     });
                //   }}
                // >
                //   <DraggableDialog
                //     title="Title"
                //     iconType="category"
                //     onClose={() => setOpenContextWindow(false)}
                //     actionsList={() => (
                //       <>
                //         <Button
                //           variant="contained"
                //           color="secondary"
                //           onClick={() => {}}
                //           startIcon={<CloseOutlinedIcon />}
                //         >
                //           {"Clear"}
                //         </Button>
                //         <Button
                //           variant="contained"
                //           color="primary"
                //           onClick={() => setOpenContextWindow(false)}
                //           startIcon={<CallReceivedIcon />}
                //         >
                //           {"Hide"}
                //         </Button>
                //       </>
                //     )}
                //   >
                //     <ChartFormatAggregator
                //       basePath={basePath}
                //       updateParameterAction={updateParameterAction}
                //       chartType={chartType as TChartTypes}
                //     />
                //   </DraggableDialog>
                // </Rnd>

                // <NewImprovedWindow
                <NewWindow
                  // onClose={() => {
                  //   setOpenContextWindow(false);
                  // }}
                  copyStyles={true}
                  // height={800}
                  // width={490}
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
