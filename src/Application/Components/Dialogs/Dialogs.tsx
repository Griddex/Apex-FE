import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import CreateEconomicsParametersTableDialog from "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog";
import EconomicsAnalysesFinalizationDialog from "../../../Economics/Components/Dialogs/EconomicsAnalysesFinalizationDialog";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import EconomicsParametersSensitivitiesDialog from "../../../Economics/Components/Dialogs/EconomicsParametersSensitivitiesDialog";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
import SaveEconomicsResultsDialog from "../../../Economics/Components/Dialogs/SaveEconomicsResultsDialog";
import SaveEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/SaveEconomicsSensitivitiesDialog";
import SelectDevelopmentScenariosDialog from "../../../Economics/Components/Dialogs/SelectDevelopmentScenariosDialog";
import StoredEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/StoredEconomicsSensitivitiesDialog";
import FinalizeForecastInputDeckDialog from "../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckDialog";
import SaveInputDeckGenerateNetworkWorkflowDialog from "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import EditOrCreateDeclineParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog";
import EditOrCreateForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateForecastingParametersWorkflowDialog";
import EditOrCreateProductionPrioritizationWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateProductionPrioritizationWorkflowDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import LinkInputDeckDialog from "../../../Network/Components/Dialogs/LinkInputDeckDialog";
import NetworkWidgetDialog from "../../../Network/Components/Dialogs/NetworkWidgetDialog";
import ProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/ProductionStreamPrioritizationDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import RunForecastWorkflowDialog from "../../../Network/Components/Dialogs/RunForecastWorkflowDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import StoredDeclineCurveParametersDialog from "../../../Network/Components/Dialogs/StoredDeclineCurveParametersDialog";
import StoredForecastingParametersDialog from "../../../Network/Components/Dialogs/StoredForecastingParametersDialog";
import StoredNetworksDialog from "../../../Network/Components/Dialogs/StoredNetworksDialog";
import { IForecastParametersStoredRow } from "../../../Network/Components/Dialogs/StoredNetworksDialogTypes";
import StoredProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/StoredProductionStreamPrioritizationDialog";
import OpenProjectConfirmationDialog from "../../../Project/Components/Dialogs/OpenProjectConfirmationDialog";
import StoredProjectsDialog from "../../../Project/Components/Dialogs/StoredProjectsDialog";
import SaveVisualyticsDeckDialog from "../../../Visualytics/Components/Dialogs/SaveVisualyticsDeckDialog";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IStoredDataRow } from "../../Types/ApplicationTypes";
import DeleteDataDialog from "./DeleteDataDialog";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import DraggableDialog from "./DraggableDialog";
import ForecastValidationErrorsDataDialog from "./ForecastValidationErrorsDataDialog";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import SnapshotDialog from "./SnapshotDialog";
import TableDataDialog from "./TableDataDialog";
import TableEditorDialog from "./TableEditorDialog";
import TextDialog from "./TextDialog";

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
  editOrCreateForecastingParametersWorkflowDialog:
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

  forecastValidationErrorsDataDialog: ForecastValidationErrorsDataDialog,
  economicsAnalysesFinalizationDialog: EconomicsAnalysesFinalizationDialog,
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
            if (type === "editOrCreateForecastingParametersWorkflowDialog") {
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
