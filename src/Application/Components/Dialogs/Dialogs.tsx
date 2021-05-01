import React from "react";
import { useSelector } from "react-redux";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import FinalizeForecastInputDeckDialog from "../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckDialog";
import SaveInputDeckGenerateNetworkWorkflowDialog from "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import SaveForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/SaveForecastingParametersWorkflowDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import ExistingProjectsDialog from "../../../Project/Components/Dialogs/ExistingProjectsDialog";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
import CreateEconomicsParametersTableDialog from "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog";

const applicationDialogs: IApplicationDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
  existingProjectsDialog: ExistingProjectsDialog,
  selectWorksheetDialog: SelectWorksheetDialog,
  finalizeForecastInputDeckDialog: FinalizeForecastInputDeckDialog,
  saveFacilitiesInputDeckDialog: SaveFacilitiesInputDeckDialog,
  saveForecastInputDeckDialog: SaveForecastInputDeckDialog,
  saveInputDeckGenerateNetworkWorkflowDialog: SaveInputDeckGenerateNetworkWorkflowDialog,
  economicsParametersDialog: EconomicsParametersDialog,
  economicsParameterImportWorkflowDialog: EconomicsParameterImportWorkflowDialog,
  newProjectWorkflowDialog: NewProjectWorkflowDialog,
  saveNetworkDialog: SaveNetworkDialog,
  existingNetworksDialog: ExistingNetworksDialog,
  generateNetworkWorkflowDialog: GenerateNetworkWorkflowDialog,
  existingForecastingParametersDialog: ExistingForecastingParametersDialog,
  saveForecastingParametersWorkflowDialog: SaveForecastingParametersWorkflowDialog,
  declineCurveParametersDialog: DeclineCurveParametersDialog,
  runForecastDialog: RunForecastDialog,
  saveForecastDialog: SaveForecastDialog,
  saveCostsRevenuesInputDeckDialog: SaveCostsRevenuesInputDeckDialog,
  saveEconomicsParametersInputDeckDialog: SaveEconomicsParametersInputDeckDialog,
  createEconomicsParametersTableDialog: CreateEconomicsParametersTableDialog,
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
