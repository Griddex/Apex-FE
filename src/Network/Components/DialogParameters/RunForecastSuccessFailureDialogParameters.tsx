import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogViewSaveForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogViewSaveForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import convertSecondsToHHMMSS from "../../../Application/Utils/ConvertSecondsToHHMMSS";
import React from "react";

export const successDialogParameters = ({ forecastDuration }: any) => {
  const successComp = (
    <ApexFlexContainer>
      <div>{"Forecast run was successfully completed!"}</div>
      <div>{convertSecondsToHHMMSS(forecastDuration)}</div>
    </ApexFlexContainer>
  );

  return {
    name: "Run_Forecast_Success_Dialog",
    title: "Forecast Run Success",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "xs",
    dialogText: successComp,
    iconType: "success",
    actionsList: () => DialogViewSaveForecastCancelButtons(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  } as DialogStuff;
};

export const failureDialogParameters = (errorMessage: string): DialogStuff => ({
  name: "Run_Forecast_Failure_Dialog",
  title: "Forecast Run  Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and the forecast run could not be completed.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
