import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SelectScenariosByButtons from "../SelectScenariosByButtons/SelectScenariosByButtons";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const SelectDevelopmentScenariosDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    workflowProcess,
    workflowCategory,
  } = props;

  const wpDefined = workflowProcess as NonNullable<TAllWorkflowProcesses>;
  const wcDefined = workflowCategory as NonNullable<TAllWorkflowCategories>;

  const costRevenuesButtonsSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wcDefined][wpDefined]["costRevenuesButtons"],
    (props) => props
  );

  const developmentScenariosCompletedSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wcDefined][wpDefined][
        "developmentScenariosCompleted"
      ],
    (props) => props
  );

  const costRevenuesButtons = useSelector(costRevenuesButtonsSelector);
  const developmentScenariosCompleted = useSelector(
    developmentScenariosCompletedSelector
  );

  const isFinalButtonDisabled =
    costRevenuesButtons.length !== developmentScenariosCompleted.length;
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 400 }}
      >
        <SelectScenariosByButtons
          workflowProcess={wpDefined}
          workflowCategory={wcDefined}
        />
      </DialogContent>
      <DialogActions>
        {actionsList && actionsList(isFinalButtonDisabled)}
      </DialogActions>
    </Dialog>
  );
};

export default SelectDevelopmentScenariosDialog;
