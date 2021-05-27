import React from "react";
import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { DialogStuff } from "./DialogTypes";
import DialogOneCancelButtons from "./../DialogButtons/DialogOneCancelButtons";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Prompt } from "react-router-dom";
import { Location } from "history";

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
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
}));

const TextDialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useDialogTitleStyles(props);
  const dispatch = useDispatch();
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>{children}</div>
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

interface IPromptDialog {
  when?: boolean | undefined;
  navigate: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
  iconType: IconNameType;
  dialogContentStyle: CSSProperties;
}

const PromptDialog: React.FC<IPromptDialog> = ({
  when,
  navigate,
  shouldBlockNavigation,
  iconType,
  dialogContentStyle,
}) => {
  const classes = useDialogContentStyles();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = React.useState(false);
  const [lastLocation, setLastLocation] = React.useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = React.useState(false);

  const handleBlockedNavigation = (
    nextLocation: Location,
    action: any
  ): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setShowDialog(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  const handleConfirmNavigationClick = () => {
    setShowDialog(false);
    setConfirmedNavigation(true);
  };

  React.useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation]);

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={showDialog}
        maxWidth={"xs"}
        fullWidth
        style={{ padding: 0 }}
      >
        <TextDialogTitle
          onClose={() => dispatch(hideDialogAction())}
          iconType={iconType}
        >
          <Typography variant="h6">{"Close without saving?"}</Typography>
        </TextDialogTitle>
        <DialogContent dividers style={dialogContentStyle}>
          <Typography className={classes.dialogContent} variant="body1">
            {
              "You have unsaved changes. Are you sure you want to leave this page without saving?"
            }
          </Typography>
          <Divider />
        </DialogContent>
        <DialogActions>
          {DialogOneCancelButtons(
            [true, true],
            [false, false],
            [() => setShowDialog(false), handleConfirmNavigationClick],
            "Confirm",
            "doneOutlined"
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default PromptDialog;

//PromptDialog
