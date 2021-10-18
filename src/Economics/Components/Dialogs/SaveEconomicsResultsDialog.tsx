import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import TitleAndDescriptionForm from "../../../Application/Components/Forms/TitleAndDescriptionForm";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SaveEconomicsResultsDialogButtons from "../DialogButtons/SaveEconomicsResultsDialogButtons";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    width: "5%",
    height: "100%",
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    color: theme.palette.primary.main,
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={() => {
              dispatch(hideSpinnerAction());
              onClose();
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const economicsResultTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["economicsResultTitles"],
  (title) => title
);

const SaveEconomicsResultsDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();

  const storedTitles = useSelector(economicsResultTitlesSelector);

  const { title, show, maxWidth, iconType } = props;
  const [isSaveEconomicsResultsValid, setIsSaveEconomicsResultsValid] =
    React.useState(true);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");

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
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TitleAndDescriptionForm
          title={formTitle}
          setTitle={setFormTitle}
          description={formDescription}
          setDescription={setFormDescription}
          storedTitles={storedTitles}
        />
      </DialogContent>
      <DialogActions>
        <SaveEconomicsResultsDialogButtons
          // isSaveEconomicsResultsValid={isSaveEconomicsResultsValid}
          isSaveEconomicsResultsValid={true}
          titleDesc={titleDesc}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SaveEconomicsResultsDialog;
