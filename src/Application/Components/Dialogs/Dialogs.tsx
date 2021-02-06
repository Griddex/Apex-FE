import React from "react";
import { useSelector } from "react-redux";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/DeclineParametersDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import GenerateNetworkWorkflow from "../../../Network/Workflows/GenerateNetworkWorkflow";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import SaveForecastInputDeckWorkflowDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckWorkflowDialog";
import ListDialog from "./ListDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import DeclineParametersDialog from "../../../Network/Components/Dialogs/DeclineParametersDialog";

const applicationDialogs: IApplicationDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
  selectWorksheetDialog: SelectWorksheetDialog,
  finalizeInputDialog: SaveForecastInputDeckWorkflowDialog,
  saveFacilitiesInputDeckDialog: SaveFacilitiesInputDeckDialog,
  saveForecastInputDeckWorkflowDialog: SaveForecastInputDeckWorkflowDialog,
  economicsParametersDialog: EconomicsParametersDialog,
  economicsParameterImportWorkflowDialog: EconomicsParameterImportWorkflowDialog,
  newProjectWorkflowDialog: NewProjectWorkflowDialog,
  saveNetworkDialog: SaveNetworkDialog,
  existingNetworksDialog: ExistingNetworksDialog,
  networkGenerationWorkflowDialog: GenerateNetworkWorkflowDialog,
  existingForecastingParametersDialog: ExistingForecastingParametersDialog,
  saveForecastingParametersWorkflowDialog: SaveForecastingParametersWorkflowDialog,
  declineParametersDialog: DeclineParametersDialog,
  runForecastDialog: RunForecastDialog,
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
