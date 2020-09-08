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

const dialogTitleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    width: 30,
    height: 30,
  },
  dialogHeader: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
  },
  mainIcon: { width: "10%" },
  dialogTitle: { width: "85%" },
});

const useDialogContentStyles = makeStyles((theme) => ({
  leftIndent: { width: "10%" },
  dialogContent: { width: "90%" },
}));

const DialogTitle = withStyles(dialogTitleStyles)((props) => {
  const { Icon, children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>{Icon}</div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {/* <div className={classes.closeIcon}> */}
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        {/* </div> */}
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(2),
    width: "90%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function MainDialog({
  Open,
  Icon,
  Title,
  Content,
  Actions,
  handleHide,
  maxWidth,
}) {
  const classes = useDialogContentStyles();

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={Open}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleHide}
        Icon={Icon}
      >
        {Title}
      </DialogTitle>
      <div>
        <DialogContent dividers>
          <div className={classes.leftIndent}></div>
          <div className={classes.dialogContent}>{Content}</div>
          <Divider />
        </DialogContent>
      </div>
      <DialogActions>{Actions}</DialogActions>
    </Dialog>
  );
}
