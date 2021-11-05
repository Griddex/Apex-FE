import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { saveForecastRequestAction } from "../../Redux/Actions/NetworkActions";

export const extrudeSaveForecastRun = () => {
  const dispatch = useDispatch();

  const extrudeSaveForecastRunConfirmation = (
    titleDesc: Record<string, string>
  ) => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Forecast_Results_Dialog",
      title: "Save Forecast Results Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current forecast results?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, () => saveForecastRequestAction(titleDesc)],
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const confirmationDialogParameters: DialogStuff = {
    name: "Save_Forecast_Dialog",
    title: "Save Forecast Run",
    type: "saveForecastDialog",
    show: true,
    exclusive: false,
    maxWidth: "sm",
    iconType: "save",
    actionsList: (titleDesc: Record<string, string>, flag?: boolean) =>
      DialogOneCancelButtons(
        [true, true],
        [true, false],
        [
          unloadDialogsAction,
          () => extrudeSaveForecastRunConfirmation(titleDesc),
        ],
        "Save",
        "saveOutlined",
        flag,
        "None"
      ),
  };

  return showDialogAction(confirmationDialogParameters);
};
