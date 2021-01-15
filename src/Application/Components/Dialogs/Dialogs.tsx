import React from "react";
import { useSelector } from "react-redux";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import SaveForecastingParametersDialog from "../../../Network/Components/Dialogs/SaveForecastingParametersDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import NewProjectDialogWorkflow from "../../../Project/Workflows/NewProjectDialogWorkflow";
import { RootState } from "../../Redux/Reducers/RootReducer";
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
  economicsParametersDialog: EconomicsParametersDialog,
  economicsParameterImportWorkflowDialog: EconomicsParameterImportWorkflowDialog,
  newProjectDialogWorkflow: NewProjectDialogWorkflow,
  saveNetworkDialog: SaveNetworkDialog,
  existingNetworksDialog: ExistingNetworksDialog,
  existingForecastingParametersDialog: ExistingForecastingParametersDialog,
  saveForecastingParametersDialog: SaveForecastingParametersDialog,
};

const Dialogs: React.FC<DialogStuff> = () => {
  const dialogs = useSelector(
    (state: RootState) => state.dialogsReducer.dialogs
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
