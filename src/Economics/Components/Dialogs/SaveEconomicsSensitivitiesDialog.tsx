import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import TitleAndDescriptionForm from "../../../Application/Components/Forms/TitleAndDescriptionForm";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSensitivitiesTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["economicsSensitivitiesTitles"],
  (title) => title
);

const SaveEconomicsSensitivitiesDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, actionsList } = props;

  const storedTitles = useSelector(economicsSensitivitiesTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [disable, setDisable] = React.useState(true);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

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
        <TitleAndDescriptionForm
          title={formTitle}
          setTitle={setFormTitle}
          description={formDescription}
          setDescription={setFormDescription}
          storedTitles={storedTitles}
          setDisable={setDisable}
        />
      </DialogContent>
      <DialogActions>
        {actionsList && actionsList(titleDesc, disable)}
      </DialogActions>
    </Dialog>
  );
};

export default SaveEconomicsSensitivitiesDialog;
