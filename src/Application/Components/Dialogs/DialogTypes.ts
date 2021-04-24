import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Column } from "react-data-griddex";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import FinalizeForecastInputDeckDialog from "../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckDialog";
import SaveInputDeckGenerateNetworkWorkflowDialog from "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog";
import {
  default as DeclineCurveParametersDialog,
  default as SaveForecastingParametersWorkflowDialog,
} from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import ExistingProjectsDialog from "../../../Project/Components/Dialogs/ExistingProjectsDialog";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import {
  IAllWorkflowProcesses,
  ReducersType,
} from "../Workflows/WorkflowTypes";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  existingProjectsDialog: typeof ExistingProjectsDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeForecastInputDeckDialog: typeof FinalizeForecastInputDeckDialog;
  saveFacilitiesInputDeckDialog: typeof SaveFacilitiesInputDeckDialog;
  saveForecastInputDeckDialog: typeof SaveForecastInputDeckDialog;
  saveInputDeckGenerateNetworkWorkflowDialog: typeof SaveInputDeckGenerateNetworkWorkflowDialog;
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
  saveForecastDialog: typeof SaveForecastDialog;
  saveCostsRevenuesInputDeckDialog: typeof SaveCostsRevenuesInputDeckDialog;
  saveEconomicsParametersInputDeckDialog: typeof SaveEconomicsParametersInputDeckDialog;
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
    | "existingProjectsDialog"
    | "selectWorksheetDialog"
    | "finalizeForecastInputDeckDialog"
    | "saveFacilitiesInputDeckDialog"
    | "saveForecastInputDeckDialog"
    | "saveInputDeckGenerateNetworkWorkflowDialog"
    | "runForecastDialog"
    | "saveForecastDialog"
    | "economicsParametersDialog"
    | "economicsParameterImportWorkflowDialog"
    | "newProjectWorkflowDialog"
    | "saveNetworkDialog"
    | "existingNetworksDialog"
    | "generateNetworkWorkflowDialog"
    | "existingForecastingParametersDialog"
    | "saveForecastingParametersWorkflowDialog"
    | "declineCurveParametersDialog"
    | "saveCostsRevenuesInputDeckDialog"
    | "saveEconomicsParametersInputDeckDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: IconNameType;
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
  onClose?: () => void;
  classes?: Record<string, string>;
  dialogData?: IDialogData<IRawRow>;
  children?: JSX.Element | JSX.Element[];
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
  selectedRowIndex?: number;
  workflowProcess?: IAllWorkflowProcesses["wrkflwPrcss"];
  workflowCategory?: IAllWorkflowProcesses["wrkflwCtgry"];
  reducer?: ReducersType;
}
export interface IDialogState<T> {
  dialogs: T[] | [];
}

export interface ButtonProps {
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  startIcon?: JSX.Element;
  handleAction?: () => { type: string } | void;
}
