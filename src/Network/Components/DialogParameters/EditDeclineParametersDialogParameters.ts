import { falseDependencies } from "mathjs";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";

export const extrudeStoredDataDPs = (
  title: string,
  currentRow: IStoredDataRow,
  forecastParametersIndex: number,
  workflowProcess: NonNullable<TAllWorkflowProcesses>
): DialogStuff<IStoredDataRow> => {
  console.log("currentRow from extrudeStoredDataDPs: ", currentRow);
  return {
    name: "Edit_Decline_Parameters_Parameters_Dialog",
    title,
    type: "createDeclineParametersWorkflowDialog",
    show: true,
    exclusive: false,
    maxWidth: "lg",
    iconType: "edit",
    forecastParametersIndex,
    workflowProcess,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    currentRow,
  };
};


//currentRow: IStoredDataRow,
//forecastParametersIndex: number,

export const extrudeStoredProductionPrioritization = (
  title: string,
  workflowProcess: NonNullable<TAllWorkflowProcesses>
): DialogStuff<IStoredDataRow> => {
  return {
    name: "Edit_Well_Prioritization_Parameters_Dialog",
    title,
    type: "createPrioritizationParametersWorkflowDialog",
    show: true,
    exclusive: false,
    maxWidth: "lg",
    iconType: "edit",
    workflowProcess,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};

//forecastParametersIndex,
//currentRow,
