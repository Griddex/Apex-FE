import React from "react";
import { useSelector } from "react-redux";
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
import CreateNewForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/CreateNewForecastingParametersWorkflowDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import StoredProjectsDialog from "../../../Project/Components/Dialogs/StoredProjectsDialog";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
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
  createNewForecastingParametersWorkflowDialog:
    CreateNewForecastingParametersWorkflowDialog,
  declineCurveParametersDialog: DeclineCurveParametersDialog,

  productionStreamPrioritizationDialog: DeclineCurveParametersDialog,

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
  saveEconomicsResultsDialog: SaveEconomicsResultsDialog,
};

const Dialogs: React.FC<DialogStuff> = () => {
  const dialogs = useSelector(
    (state: RootState) => state.dialogsReducer && state.dialogsReducer.dialogs
  );

  return (
    <div>
      {(dialogs as any[]).map((dialog: DialogStuff, i: number) => {
        const { type } = dialog;

        if (dialog !== undefined && dialog.show === true && type) {
          const SpecificDialog = applicationDialogs[type];
          return <SpecificDialog key={i} {...dialog} />;
        }
      })}
    </div>
  );
};

export default Dialogs;
