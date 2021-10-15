import { RootState } from "../../Redux/Reducers/AllReducers";
import React from "react";
import { useSelector } from "react-redux";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import { IForecastParametersStoredRow } from "../../../Network/Components/Dialogs/StoredNetworksDialogTypes";
import { IStoredDataRow } from "../../Types/ApplicationTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const SaveCostsRevenuesInputDeckDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog"
    )
);
const EconomicsParametersDialog = React.lazy(
  () =>
    import("../../../Economics/Components/Dialogs/EconomicsParametersDialog")
);
const FinalizeForecastInputDeckDialog = React.lazy(
  () =>
    import("../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog")
);
const SaveFacilitiesInputDeckDialog = React.lazy(
  () =>
    import("../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog")
);
const SaveForecastInputDeckDialog = React.lazy(
  () => import("../../../Import/Components/Dialogs/SaveForecastInputDeckDialog")
);
const SaveInputDeckGenerateNetworkWorkflowDialog = React.lazy(
  () =>
    import(
      "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog"
    )
);
const DeclineCurveParametersDialog = React.lazy(
  () =>
    import("../../../Network/Components/Dialogs/DeclineCurveParametersDialog")
);
const StoredForecastingParametersDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/StoredForecastingParametersDialog"
    )
);
const StoredNetworksDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/StoredNetworksDialog")
);
const GenerateNetworkWorkflowDialog = React.lazy(
  () =>
    import("../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog")
);
const RunForecastDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/RunForecastDialog")
);
const SaveForecastDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/SaveForecastDialog")
);
const EditOrCreateForecastingParametersWorkflowDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/EditOrCreateForecastingParametersWorkflowDialog"
    )
);
const EditOrCreateDeclineParametersWorkflowDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog"
    )
);
const EditOrCreateProductionPrioritizationWorkflowDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/EditOrCreateProductionPrioritizationWorkflowDialog"
    )
);
const SaveNetworkDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/SaveNetworkDialog")
);
const StoredProjectsDialog = React.lazy(
  () => import("../../../Project/Components/Dialogs/StoredProjectsDialog")
);
const ListDialog = React.lazy(() => import("./ListDialog"));
const NewProjectWorkflowDialog = React.lazy(
  () => import("./NewProjectWorkflowDialog")
);
const SelectWorksheetDialog = React.lazy(
  () => import("./SelectWorksheetDialog")
);
const TextDialog = React.lazy(() => import("./TextDialog"));
const SaveEconomicsParametersInputDeckDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog"
    )
);
const CreateEconomicsParametersTableDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog"
    )
);
const EconomicsParametersSensitivitiesDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/EconomicsParametersSensitivitiesDialog"
    )
);
const SaveEconomicsSensitivitiesDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/SaveEconomicsSensitivitiesDialog"
    )
);
const StoredEconomicsSensitivitiesDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/StoredEconomicsSensitivitiesDialog"
    )
);
const RunForecastWorkflowDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/RunForecastWorkflowDialog")
);
const SelectDevelopmentScenariosDialog = React.lazy(
  () =>
    import(
      "../../../Economics/Components/Dialogs/SelectDevelopmentScenariosDialog"
    )
);
const TableDataDialog = React.lazy(() => import("./TableDataDialog"));
const TableEditorDialog = React.lazy(() => import("./TableEditorDialog"));
const DraggableDialog = React.lazy(() => import("./DraggableDialog"));
const SaveEconomicsResultsDialog = React.lazy(
  () =>
    import("../../../Economics/Components/Dialogs/SaveEconomicsResultsDialog")
);
const ProductionStreamPrioritizationDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/ProductionStreamPrioritizationDialog"
    )
);
const StoredDeclineCurveParametersDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/StoredDeclineCurveParametersDialog"
    )
);
const StoredProductionStreamPrioritizationDialog = React.lazy(
  () =>
    import(
      "../../../Network/Components/Dialogs/StoredProductionStreamPrioritizationDialog"
    )
);
const DeleteDataDialog = React.lazy(() => import("./DeleteDataDialog"));
const SnapshotDialog = React.lazy(() => import("./SnapshotDialog"));
const NetworkWidgetDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/NetworkWidgetDialog")
);
const LinkInputDeckDialog = React.lazy(
  () => import("../../../Network/Components/Dialogs/LinkInputDeckDialog")
);
const OpenProjectConfirmationDialog = React.lazy(
  () =>
    import("../../../Project/Components/Dialogs/OpenProjectConfirmationDialog")
);
const SaveVisualyticsDeckDialog = React.lazy(
  () =>
    import("../../../Visualytics/Components/Dialogs/SaveVisualyticsDeckDialog")
);

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
