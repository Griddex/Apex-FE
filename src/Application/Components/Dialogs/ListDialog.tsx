import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { IDialogTitleProps, ListDialogProps } from "./Types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const icons = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#2BB4C1" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#2BB4C1" }} />,
  information: <InfoOutlinedIcon style={{ color: "#2BB4C1" }} />,
};

const useDialogTitleStyles = makeStyles((theme: Theme) => ({
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
    // backgroundColor: (props) => props.iconColor,
    color: (props: IDialogTitleProps) => {
      return props.iconColor;
    },
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
}));

const ListDialogTitle: React.FC<IDialogTitleProps> = (props) => {
  const classes = useDialogTitleStyles(props);
  const { icon, children, onClose, ...other } = props;

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

const ListDialog: React.FC<ListDialogProps> = (props: ListDialogProps) => {
  const {
    show,
    iconColor,
    iconClass,
    title,
    content,
    actions,
    maxWidth,
  } = props;
  const dispatch = useDispatch();

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show}
      maxWidth={maxWidth}
      fullWidth
    >
      <ListDialogTitle
        // id="customized-dialog-title"
        onClose={() => dispatch(hideDialogAction())}
        icon={icons[iconClass]}
        iconColor={iconColor}
        iconClass={iconClass}
      >
        {title}
      </ListDialogTitle>
      <DialogContent dividers>
        {typeof content === "function" ? content() : content}
        <Divider />
      </DialogContent>
      <DialogActions>{actions()}</DialogActions>
    </Dialog>
  );
};
export default ListDialog;
