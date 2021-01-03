import React from "react";
import { useSelector } from "react-redux";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import FinalizeInputDialog from "./FinalizeInputDialog";
import { RootState } from "../../Redux/Reducers/RootReducer";
import { IApplicationDialogs, DialogStuff } from "./DialogTypes";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import NewProjectDialog from "./NewProjectDialog";

const applicationDialogs: IApplicationDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
  selectWorksheetDialog: SelectWorksheetDialog,
  finalizeInputDialog: FinalizeInputDialog,
  economicsParametersDialog: EconomicsParametersDialog,
  economicsParameterImportWorkflowDialog: EconomicsParameterImportWorkflowDialog,
  newProjectDialog: NewProjectDialog,
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
