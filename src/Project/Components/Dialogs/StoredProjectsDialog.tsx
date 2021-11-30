import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import StoredProjects from "../../Routes/StoredProjects";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.selectedProjectId,
  (id) => id
);
const selectedProjectTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.selectedProjectTitle,
  (data) => data
);
const selectedProjectDescriptionSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.selectedProjectDescription,
  (data) => data
);

const StoredProjectsDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, actionsList } = props;

  const selectedProjectId = useSelector(selectedProjectIdSelector);
  const selectedProjectTitle = useSelector(selectedProjectTitleSelector);
  const selectedProjectDescription = useSelector(
    selectedProjectDescriptionSelector
  );

  const flag = selectedProjectId ? false : true;

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
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <StoredProjects
          reducer="projectReducer"
          containerStyle={{ boxShadow: "none" }}
        />
      </DialogContent>
      <DialogActions>
        {actionsList &&
          actionsList(
            {
              selectedProjectId,
              selectedProjectTitle,
              selectedProjectDescription,
            },
            flag
          )}
      </DialogActions>
    </Dialog>
  );
};

export default StoredProjectsDialog;
