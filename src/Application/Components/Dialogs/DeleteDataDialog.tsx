import { DialogActions, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme, useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
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

const DeleteDataDialog: React.FC<DialogStuff> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    title,
    deleteTitle,
    show,
    maxWidth,
    iconType,
    dialogContentStyle,
    actionsList,
  } = props;

  const [deleteTitleConfirm, setDeleteTitleConfirm] = React.useState("");

  const isFinalButtonDisabled =
    (deleteTitleConfirm as string).trim().toLowerCase() ===
    (deleteTitle as string).trim().toLowerCase()
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
        <div>{title}</div>
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
            {`You are about to delete all data associated with:`}
          </Typography>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <strong
            style={{
              fontSize: theme.typography.h6.fontSize,
              color: theme.palette.secondary.main,
            }}
          >
            {deleteTitle}
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
            value={deleteTitleConfirm}
            margin="dense"
            onChange={(event) => {
              const { value } = event.target;
              setDeleteTitleConfirm(value);
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
