import React from "react";
import { useSelector } from "react-redux";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckWorkflowDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckWorkflowDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/SaveForecastingParametersWorkflowDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { DialogStuff, IApplicationDialogs } from "./DialogTypes";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";

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
  generateNetworkWorkflowDialog: GenerateNetworkWorkflowDialog,
  existingForecastingParametersDialog: ExistingForecastingParametersDialog,
  saveForecastingParametersWorkflowDialog: SaveForecastingParametersWorkflowDialog,
  declineCurveParametersDialog: DeclineCurveParametersDialog,
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
