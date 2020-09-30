import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { useDispatch } from "react-redux";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";

const icons = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#2BB4C1" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#2BB4C1" }} />,
};

const dialogTitleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
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
    // color: (props) => props.iconColor,
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
  },
  closeButton: {
    // position: "absolute",
    // right: theme.spacing(1),
    // top: theme.spacing(1),
    color: theme.palette.grey[500],
    width: "5%",
    height: "100%",
    padding: 0,
  },
});

const useDialogContentStyles = makeStyles((theme) => ({
  dialogContent: { marginLeft: "5%", width: "95%" },
}));

const DialogTitle = withStyles(dialogTitleStyles)((props) => {
  console.log("Logged output -->: DialogTitle -> props", props);
  const { icon, children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>{icon}</div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

export default function TextDialog({
  show,
  icon,
  iconClass,
  title,
  actions,
  dialogText,
  maxWidth,
}) {
  const classes = useDialogContentStyles();
  const dispatch = useDispatch();

  console.log("Logged output -->: icon", icon);
  console.log("Logged output -->: icons[iconClass]", icons[iconClass]);
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => dispatch(hideDialogAction())}
        icon={icons[iconClass]}
      >
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Typography className={classes.dialogContent} variant="body1">
          {dialogText}
        </Typography>
        <Divider />
      </DialogContent>
      <DialogActions>{actions()}</DialogActions>
    </Dialog>
  );
}
