import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IForecastParametersStoredRow } from "../Dialogs/StoredNetworksDialogTypes";

export const extrudeForecastParametersDPs = (
  title: string,
  currentRow: IForecastParametersStoredRow,
  forecastParametersIndex: number,
  workflowProcess: NonNullable<TAllWorkflowProcesses>,
  iconType: IconNameType
): DialogStuff<IForecastParametersStoredRow> => {
  return {
    name: "Edit_Forecast_Parameters_Parameters_Dialog",
    title,
    type: "editOrCreateForecastingParametersWorkflowDialog",
    show: true,
    exclusive: false,
    maxWidth: "lg",
    iconType,
    forecastParametersIndex,
    workflowProcess,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    currentRow,
  };
};
