import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import { IEconomicsWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { IEconomicsAnalysis } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import EconomicsParametersSensitivities from "../../Routes/EconomicsAnalyses/EconomicsParametersSensitivities/EconomicsParametersSensitivities";

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

const EconomicsParametersSensitivitiesDialog: React.FC<DialogStuff> = (
  props
) => {
  const dispatch = useDispatch();
  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    workflowProcess,
    selectedAnalysis,
  } = props;

  const workflowProcessDefined = workflowProcess as NonNullable<
    IEconomicsWorkflows["wkPs"]
  >;

  const selectedAnalysisDefined = selectedAnalysis as IEconomicsAnalysis;
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
        <EconomicsParametersSensitivities
          workflowProcess={workflowProcessDefined}
          selectedAnalysis={selectedAnalysisDefined}
        />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default EconomicsParametersSensitivitiesDialog;
