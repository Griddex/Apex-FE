import { RootState } from "../../Redux/Reducers/AllReducers";
import React from "react";
import { useSelector } from "react-redux";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import { IForecastParametersStoredRow } from "../../../Network/Components/Dialogs/StoredNetworksDialogTypes";
import { IStoredDataRow } from "../../Types/ApplicationTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import FinalizeForecastInputDeckDialog from "../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckDialog";
import SaveInputDeckGenerateNetworkWorkflowDialog from "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import StoredForecastingParametersDialog from "../../../Network/Components/Dialogs/StoredForecastingParametersDialog";
import StoredNetworksDialog from "../../../Network/Components/Dialogs/StoredNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import EditOrCreateForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateForecastingParametersWorkflowDialog";
import EditOrCreateDeclineParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog";
import EditOrCreateProductionPrioritizationWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateProductionPrioritizationWorkflowDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import StoredProjectsDialog from "../../../Project/Components/Dialogs/StoredProjectsDialog";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
import CreateEconomicsParametersTableDialog from "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog";
import EconomicsParametersSensitivitiesDialog from "../../../Economics/Components/Dialogs/EconomicsParametersSensitivitiesDialog";
import SaveEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/SaveEconomicsSensitivitiesDialog";
import StoredEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/StoredEconomicsSensitivitiesDialog";
import RunForecastWorkflowDialog from "../../../Network/Components/Dialogs/RunForecastWorkflowDialog";
import SelectDevelopmentScenariosDialog from "../../../Economics/Components/Dialogs/SelectDevelopmentScenariosDialog";
import TableDataDialog from "./TableDataDialog";
import TableEditorDialog from "./TableEditorDialog";
import DraggableDialog from "./DraggableDialog";
import SaveEconomicsResultsDialog from "../../../Economics/Components/Dialogs/SaveEconomicsResultsDialog";
import ProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/ProductionStreamPrioritizationDialog";
import StoredDeclineCurveParametersDialog from "../../../Network/Components/Dialogs/StoredDeclineCurveParametersDialog";
import StoredProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/StoredProductionStreamPrioritizationDialog";
import DeleteDataDialog from "./DeleteDataDialog";
import SnapshotDialog from "./SnapshotDialog";
import NetworkWidgetDialog from "../../../Network/Components/Dialogs/NetworkWidgetDialog";
import LinkInputDeckDialog from "../../../Network/Components/Dialogs/LinkInputDeckDialog";
import OpenProjectConfirmationDialog from "../../../Project/Components/Dialogs/OpenProjectConfirmationDialog";
import SaveVisualyticsDeckDialog from "../../../Visualytics/Components/Dialogs/SaveVisualyticsDeckDialog";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const applicationDialogs: IApplicationDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,

  storedProjectsDialog: StoredProjectsDialog,
  selectWorksheetDialog: SelectWorksheetDialog,
  finalizeForecastInputDeckDialog: FinalizeForecastInputDeckDialog,
  saveFacilitiesInputDeckDialog: SaveFacilitiesInputDeckDialog,
  saveForecastInputDeckDialog: SaveForecastInputDeckDialog,
  saveInputDeckGenerateNetworkWorkflowDialog:
    SaveInputDeckGenerateNetworkWorkflowDialog,
  economicsParametersDialog: EconomicsParametersDialog,
  newProjectWorkflowDialog: NewProjectWorkflowDialog,
  saveNetworkDialog: SaveNetworkDialog,
  storedNetworksDialog: StoredNetworksDialog,
  generateNetworkWorkflowDialog: GenerateNetworkWorkflowDialog,
  storedForecastingParametersDialog: StoredForecastingParametersDialog,
  createForecastingParametersWorkflowDialog:
    EditOrCreateForecastingParametersWorkflowDialog,
  createDeclineParametersWorkflowDialog:
    EditOrCreateDeclineParametersWorkflowDialog,
  createPrioritizationParametersWorkflowDialog:
    EditOrCreateProductionPrioritizationWorkflowDialog,
  declineCurveParametersDialog: DeclineCurveParametersDialog,

  productionStreamPrioritizationDialog: ProductionStreamPrioritizationDialog,

  runForecastDialog: RunForecastDialog,
  runForecastWorkflowDialog: RunForecastWorkflowDialog,
  saveForecastDialog: SaveForecastDialog,
  saveCostsRevenuesInputDeckDialog: SaveCostsRevenuesInputDeckDialog,
  saveEconomicsParametersInputDeckDialog:
    SaveEconomicsParametersInputDeckDialog,
  createEconomicsParametersTableDialog: CreateEconomicsParametersTableDialog,
  economicsParametersSensitivitiesDialog:
    EconomicsParametersSensitivitiesDialog,
  saveEconomicsSensitivitiesDialog: SaveEconomicsSensitivitiesDialog,
  storedEconomicsSensitivitiesDialog: StoredEconomicsSensitivitiesDialog,
  selectDevelopmentScenariosDialog: SelectDevelopmentScenariosDialog,

  tableDataDialog: TableDataDialog,
  tableEditorDialog: TableEditorDialog,
  draggableDialog: DraggableDialog,
  deleteDataDialog: DeleteDataDialog,

  saveEconomicsResultsDialog: SaveEconomicsResultsDialog,

  storedDeclineCurveParametersDialog: StoredDeclineCurveParametersDialog,
  storedProductionStreamPrioritizationDialog:
    StoredProductionStreamPrioritizationDialog,

  snapshotDialog: SnapshotDialog,
  networkWidgetDialog: NetworkWidgetDialog,
  linkInputDeckDialog: LinkInputDeckDialog,

  openProjectConfirmationDialog: OpenProjectConfirmationDialog,
  saveVisualyticsDeckDialog: SaveVisualyticsDeckDialog,
};

const dialogsSelector = createDeepEqualSelector(
  (state: RootState) => state.dialogsReducer?.dialogs,
  (dialogs) => dialogs
);

const Dialogs: React.FC<DialogStuff> = () => {
  const dialogs = useSelector(dialogsSelector);

  return (
    <>
      {(dialogs as any[]).map(
        (
          dialog:
            | DialogStuff
            | DialogStuff<IForecastParametersStoredRow>
            | DialogStuff<IStoredDataRow>,
          i: number
        ) => {
          const { type } = dialog;

          if (dialog !== undefined && dialog.show === true && type) {
            if (type === "createForecastingParametersWorkflowDialog") {
              const SpecificDialog = applicationDialogs[type];
              const dialogDefined =
                dialog as DialogStuff<IForecastParametersStoredRow>;

              return <SpecificDialog key={i} {...dialogDefined} />;
            } else if (type === "createDeclineParametersWorkflowDialog") {
              const SpecificDialog = applicationDialogs[type];
              const dialogDefined = dialog as DialogStuff<IStoredDataRow>;
              return <SpecificDialog key={i} {...dialogDefined} />;
            } else if (
              type === "createPrioritizationParametersWorkflowDialog"
            ) {
              const SpecificDialog = applicationDialogs[type];
              const dialogDefined = dialog as DialogStuff<IStoredDataRow>;
              return <SpecificDialog key={i} {...dialogDefined} />;
            } else {
              const SpecificDialog = applicationDialogs[type];
              const dialogDefined = dialog as DialogStuff;

              return <SpecificDialog key={i} {...dialogDefined} />;
            }
          }
        }
      )}
    </>
  );
};

export default Dialogs;
