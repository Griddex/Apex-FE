import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { IForecastParametersStoredRow } from "../Dialogs/StoredNetworksDialogTypes";

export const extrudeForecastParametersDPs = (
  title: string,
  currentRow: IForecastParametersStoredRow,
  rows: IForecastParametersStoredRow[],
  setRows: TUseState<IForecastParametersStoredRow[]>,
  forecastParametersIndex: number,
  workflowProcess: NonNullable<TAllWorkflowProcesses>
): DialogStuff<IForecastParametersStoredRow> => {
  return {
    name: "Edit_Forecast_Parameters_Parameters_Dialog",
    title,
    type: "createForecastingParametersWorkflowDialog",
    show: true,
    exclusive: false,
    maxWidth: "xl",
    iconType: "edit",
    forecastParametersIndex,
    workflowProcess,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    currentRow,
    rows,
    setRows,
  };
};
