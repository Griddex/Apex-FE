import React from "react";
import { useSelector } from "react-redux";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastingParametersDialog from "../../../Network/Components/Dialogs/SaveForecastingParametersDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import GenerateNetworkDialogWorkflow from "../../../Network/Workflows/GenerateNetworkDialogWorkflow";
import NewProjectDialogWorkflow from "../../../Project/Workflows/NewProjectDialogWorkflow";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import FinalizeInputDialog from "./FinalizeInputDialog";
import ListDialog from "./ListDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";

const applicationDialogs: IApplicationDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
  selectWorksheetDialog: SelectWorksheetDialog,
  finalizeInputDialog: FinalizeInputDialog,
  saveFacilitiesInputDeckDialog: SaveFacilitiesInputDeckDialog,
  economicsParametersDialog: EconomicsParametersDialog,
  economicsParameterImportDialogWorkflow: EconomicsParameterImportWorkflowDialog,
  newProjectDialogWorkflow: NewProjectDialogWorkflow,
  saveNetworkDialog: SaveNetworkDialog,
  existingNetworksDialog: ExistingNetworksDialog,
  networkGenerationDialogWorkflow: GenerateNetworkDialogWorkflow,
  existingForecastingParametersDialog: ExistingForecastingParametersDialog,
  saveForecastingParametersDialog: SaveForecastingParametersDialog,
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
