import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import dialogIcons from "../Icons/DialogIcons";
import { DialogStuff } from "./DialogTypes";

const useDialogTitleStyles = makeStyles((theme: Theme) => ({
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
    marginRight: 5,
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
  },
}));
const TextDialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useDialogTitleStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {dialogIcons[iconType ? iconType : "select"]}
        </div>
        <div className={classes.dialogTitle}>{children}</div>
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
};

const useDialogContentStyles = makeStyles(() => ({
  dialogContent: { marginLeft: "5%", width: "95%" },
}));
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

const TextDialog: React.FC<DialogStuff> = ({
  title,
  show,
  maxWidth,
  iconType,
  dialogText,
  actionsList,
  dialogContentStyle,
}) => {
  const classes = useDialogContentStyles();
  const dispatch = useDispatch();

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
      style={{ padding: 0 }}
    >
      <TextDialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <Typography variant="h6">{title}</Typography>
      </TextDialogTitle>
      <DialogContent dividers style={dialogContentStyle}>
        <Typography className={classes.dialogContent} variant="body1">
          {dialogText}
        </Typography>
        <Divider />
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#F7F7F7" }}>
        {actionsList && actionsList()}
      </DialogActions>
    </Dialog>
  );
};
export default TextDialog;
