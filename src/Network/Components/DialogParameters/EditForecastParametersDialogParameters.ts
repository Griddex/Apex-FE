import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const extrudeForecastParametersDPs = (
  selectedRowIndex: number,
  apexEditorComponent: React.FC
): DialogStuff => {
  return {
    name: "Edit_Forecast_Parameters_Parameters_Dialog",
    title: "Edit Forecast Parameters",
    type: "tableEditorDialog",
    show: true,
    exclusive: false,
    maxWidth: "xl",
    iconType: "information",
    selectedRowIndex,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    apexEditorComponent,
  };
};
