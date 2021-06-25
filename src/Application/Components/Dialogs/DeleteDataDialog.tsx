import { DialogActions, Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import {
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    height: "100%",
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  input: {
    width: "100%",
    fontSize: 14,
    marginTop: 20,
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
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

const DeleteDataDialog = (props: DialogStuff) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { title, show, maxWidth, iconType, dialogContentStyle, actionsList } =
    props;

  const [confirmDeleteTitle, setConfirmDeleteTitle] = React.useState("");

  const isFinalButtonDisabled =
    confirmDeleteTitle.trim().toLowerCase() ===
    (title as string).trim().toLowerCase()
      ? false
      : true;

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
        <div>{`Delete ${title}`}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          ...dialogContentStyle,
        }}
      >
        <ApexFlexContainer flexDirection="column" alignItems="flex-start">
          <Typography variant="body1">
            {`You are about to delete all data associated with title:`}
          </Typography>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <strong
            style={{
              fontSize: theme.typography.h6.fontSize,
              color: theme.palette.secondary.main,
            }}
          >
            {title}
          </strong>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <Typography variant="body1">
            {`Confirm this action by copying and pasting the title in the
          input box below`}
          </Typography>
          <span>&nbsp;</span>
          <Input
            className={classes.input}
            value={confirmDeleteTitle}
            margin="dense"
            onChange={(event) => {
              const { value } = event.target;
              setConfirmDeleteTitle(value);
            }}
          />
        </ApexFlexContainer>
      </DialogContent>
      <DialogActions>
        {actionsList && actionsList(isFinalButtonDisabled)}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDataDialog;
