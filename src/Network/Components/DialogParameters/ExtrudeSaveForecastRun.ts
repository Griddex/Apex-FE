import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

export const extrudeSaveForecastRun = () => {
  const confirmationDialogParameters: DialogStuff = {
    name: "Save_Forecast_Dialog",
    title: "Save Forecast Run",
    type: "saveForecastDialog",
    show: true,
    exclusive: false,
    maxWidth: "sm",
    iconType: "confirmation",
  };

  return showDialogAction(confirmationDialogParameters);
};
