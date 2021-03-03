import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogViewSaveForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogViewSaveForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const successDialogParameters = (): DialogStuff => ({
  name: "Get_ForecastResults_Success_Dialog",
  title: "Forecast Results Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Forecast Results was successfully fetched!`,
  iconType: "success",
  actionsList: () => DialogViewSaveForecastCancelButtons(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (errorMessage: string): DialogStuff => ({
  name: "Get_ForecastResults_Failure_Dialog",
  title: "Forecast Results Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happended and the selected forecast result data could not be fetched.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
