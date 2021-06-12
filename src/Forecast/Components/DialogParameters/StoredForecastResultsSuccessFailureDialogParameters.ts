import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogViewSaveForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogViewSaveForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const successDialogParameters = (): DialogStuff => ({
  name: "Stored_ForecastResults_Success_Dialog",
  title: "Stored Forecast Results Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Forecast Results metadata were successfully fetched!`,
  iconType: "success",
  actionsList: () => DialogViewSaveForecastCancelButtons(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (errorMessage: string): DialogStuff => ({
  name: "Stored_ForecastResults_Failure_Dialog",
  title: "Stored Forecast Results Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and the stored forecast results table could not be fetched.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
