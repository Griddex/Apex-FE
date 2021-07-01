import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogViewSaveEconomicsCancelButtons from "../../../Application/Components/DialogButtons/DialogViewSaveEconomicsCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const successDialogParameters = (
  analysisTitle: string
): DialogStuff => ({
  name: `${analysisTitle}_Calculation_Success_Dialog`,
  title: `${analysisTitle} Calculation Success`,
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `${analysisTitle} calculation was successfully completed!`,
  iconType: "success",
  actionsList: () => DialogViewSaveEconomicsCancelButtons(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (
  errorMessage: string,
  analysisTitle: string
): DialogStuff => ({
  name: `${analysisTitle}_Calculation_Failure_Dialog`,
  title: `${analysisTitle} Calculation Failure`,
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and ${analysisTitle} calculation could not be completed.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
