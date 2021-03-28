import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { updateInputAction } from "../../Redux/Actions/ImportActions";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IImportWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";

export const successDialogParameters = (
  inputDeckType: string,
  wp: IImportWorkflowProcess["wkPs"]
): DialogStuff => ({
  name: "Save_InputDeck_Success_Dialog",
  title: `Save  ${inputDeckType} Success`,
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `${inputDeckType} was saved successfully`,
  iconType: "success",
  actionsList: () =>
    DialogOkayButton(
      [true, true],
      [true, true],
      [
        unloadDialogsAction,
        () => updateInputAction(`importDataWorkflows.${wp}.activeStep`, 0),
      ]
    ),

  // DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (
  inputDeckType: string
): DialogStuff => ({
  name: "Save_InputDeck_Failure_Dialog",
  title: `Save  ${inputDeckType} Failure`,
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Save ${inputDeckType} failure`,
  iconType: "error",
  actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});