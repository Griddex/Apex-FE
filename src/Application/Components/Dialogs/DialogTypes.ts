import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ReactNode } from "react";
import { Column } from "react-data-griddex";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckWorkflowDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckWorkflowDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../Workflows/WorkflowTypes";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  saveFacilitiesInputDeckDialog: typeof SaveFacilitiesInputDeckDialog;
  saveForecastInputDeckWorkflowDialog: typeof SaveForecastInputDeckWorkflowDialog;
  finalizeInputDialog: typeof SaveForecastInputDeckWorkflowDialog;
  economicsParametersDialog: typeof EconomicsParametersDialog;
  economicsParameterImportWorkflowDialog: typeof EconomicsParameterImportWorkflowDialog;
  newProjectWorkflowDialog: typeof NewProjectWorkflowDialog;
  saveNetworkDialog: typeof SaveNetworkDialog;
  existingNetworksDialog: typeof ExistingNetworksDialog;
  generateNetworkWorkflowDialog: typeof GenerateNetworkWorkflowDialog;
  existingForecastingParametersDialog: typeof ExistingForecastingParametersDialog;
  saveForecastingParametersWorkflowDialog: typeof SaveForecastingParametersWorkflowDialog;
  declineCurveParametersDialog: typeof DeclineCurveParametersDialog;
  runForecastDialog: typeof RunForecastDialog;
}

export interface IDialogsServiceProps {
  contentName: string;
  actionsName: string;
  workSheetNames: string[];
  selectedWorksheetName: string;
  inputFile: Record<string, number | string | Element>[];
  skipped: Set<string>;
  isStepSkipped: boolean;
  activeStep: number;
  steps: string[];
}

export type ITableRow = Record<string, React.Key>;
export interface IDialogData<T> {
  columns: Column<T>[];
  rows: T[];
}
export interface DialogStuff {
  name?: string;
  title?: string;
  type?:
    | "listDialog"
    | "textDialog"
    | "selectWorksheetDialog"
    | "saveFacilitiesInputDeckDialog"
    | "saveForecastInputDeckWorkflowDialog"
    | "finalizeInputDialog"
    | "runForecastDialog"
    | "economicsParametersDialog"
    | "economicsParameterImportWorkflowDialog"
    | "newProjectWorkflowDialog"
    | "saveNetworkDialog"
    | "existingNetworksDialog"
    | "generateNetworkWorkflowDialog"
    | "existingForecastingParametersDialog"
    | "saveForecastingParametersWorkflowDialog"
    | "declineCurveParametersDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: IconNameType;
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
  onClose?: () => unknown;
  classes?: Record<string, string>;
  dialogData?: IDialogData<IRawRow>;
  children?: JSX.Element | JSX.Element[];
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
  selectedRowIndex?: number;
  workflowProcess?: IAllWorkflowProcesses["wrkflwPrcss"];
  workflowCategory?: IAllWorkflowProcesses["wrkflwCtgry"];
}
export interface IDialogState<T> {
  dialogs: T[] | [];
}

export interface ButtonProps {
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  startIcon: ReactNode;
  handleAction?: () => { type: string } | void;
}
