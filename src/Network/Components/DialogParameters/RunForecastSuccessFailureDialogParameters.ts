import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogViewSaveForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogViewSaveForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const successDialogParameters = (): DialogStuff => ({
  name: "Run_Forecast_Success_Dialog",
  title: "Forecast Run Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Forecast run was successfully completed!`,
  iconType: "success",
  actionsList: () => DialogViewSaveForecastCancelButtons(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

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
