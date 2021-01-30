import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { DialogStuff } from "./../../../Application/Components/Dialogs/DialogTypes";
import history from "../../../Application/Services/HistoryService";

const navigateToFacilitiesLanding = () => {
  console.log("navigate to facilities landinggggggggggg");
  history.replace("/apex/import/facilitiesdeck");
};

export const successDialogParameters = (
  inputDeckType: string
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
    // DialogOkayButton(
    //   [true, true],
    //   [true, false],
    //   [unloadDialogsAction, navigateToFacilitiesLanding]
    // ),
    DialogOkayButton([true], [true], [unloadDialogsAction]),
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
