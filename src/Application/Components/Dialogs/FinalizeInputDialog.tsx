import { Button, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { groupBy } from "lodash";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveInputDeckRequestAction } from "../../../Import/Redux/Actions/ImportActions";
import { getInputWorkflowlabel } from "../../../Import/Utils/GetInputWorkflowLabel";
import ConnectFlowstationsToTerminal from "../../../Network/Utils/ConnectFlowstationsToTerminal";
import ConnectManifoldsToStations from "../../../Network/Utils/ConnectManifoldsToStations";
import ConnectWellheadsToManifolds from "../../../Network/Utils/ConnectWellheadsToManifolds";
import ConnectWellheadSummariesToManifolds from "../../../Network/Utils/ConnectWellheadSummariesToManifolds";
import GenerateFlowstationNodes from "../../../Network/Utils/GenerateFlowstationNodes";
import GenerateGasFacilityNodes from "../../../Network/Utils/GenerateGasFacilityNodes";
import GenerateManifoldNodes from "../../../Network/Utils/GenerateManifoldNodes";
import GenerateTerminalNodes from "../../../Network/Utils/GenerateTerminalNodes";
import GenerateWellheadNodes from "../../../Network/Utils/GenerateWellheadNodes";
import SplitFlowstationsGasFacilities from "../../../Network/Utils/SplitFlowstationsGasFacilities";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { RootState } from "../../Redux/Reducers/AllReducers";
import AnalyticsComp from "../Basic/AnalyticsComp";
import dialogIcons from "../Icons/DialogIcons";
import { IImportWorkflowProcess } from "../Workflows/WorkflowTypes";
import { persistNetworkElementsAction } from "./../../../Network/Redux/Actions/NetworkActions";
import { GenerateWellheadSummaryNodes } from "./../../../Network/Utils/GenerateWellheadSummaryNodes";
import { ButtonProps, DialogStuff } from "./DialogTypes";
import DialogCancelButton from "./../DialogButtons/DialogCancelButton";

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    color: theme.palette.primary.main,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: 350,
    width: "100%",
    "& > *": {
      height: 50,
      width: "95%",
      boxShadow: theme.shadows[10],
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {dialogIcons[iconType ? iconType : "select"]}
        </div>
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

const FinalizeInputDialog = (props: DialogStuff) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  // const workflowCategory = "importDataWorkflows";

  const {
    title,
    show,
    maxWidth,
    iconType,
    workflowProcess,
    workflowCategory,
  } = props;

  const wc = workflowCategory as IImportWorkflowProcess["workflowCategory"];
  const wp = workflowProcess as IImportWorkflowProcess["workflowProcess"];

  const { subModuleName } = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { inputDeckData, success } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );
  const { showWellheadSummaryNodes, showWellheadSummaryEdges } = useSelector(
    (state: RootState) => state.networkReducer
  );

  if (success) {
    enqueueSnackbar(`${getInputWorkflowlabel[wp]} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const ManageDeckDialogContent = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Save Deck Only",
        color: "primary",
        startIcon: <SaveOutlinedIcon />,
        handleAction: () => {
          dispatch(saveInputDeckRequestAction(wp));
        },
      },
      {
        title: "Save and Automatically Generate Network",
        color: "primary",
        startIcon: <ControlCameraOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "success",
          });

          //Group forecast data by station
          const flowStationsGasFacilitiesData = groupBy(
            inputDeckData,
            (row) => row["Flow station"]
          );
          const {
            flowStationsData,
            gasFacilitiesData,
          } = SplitFlowstationsGasFacilities(flowStationsGasFacilitiesData);

          //Group forecast data by station
          const wellheadDatabyManifold = groupBy(
            inputDeckData,
            (row) => row["Drainage Point"]
          );

          //Nodes
          const terminalNodes = GenerateTerminalNodes([
            "Forcados Yokri Terminal",
          ]);
          const flowstationNodes = GenerateFlowstationNodes(flowStationsData);
          const gasFacilityNodes = GenerateGasFacilityNodes(gasFacilitiesData);
          const manifoldNodes = GenerateManifoldNodes(
            flowstationNodes,
            gasFacilityNodes
          );
          const wellheadNodes = GenerateWellheadNodes(
            manifoldNodes,
            flowStationsData,
            gasFacilitiesData,
            wellheadDatabyManifold
          );
          const wellheadNodesMerged = [];
          for (const node of Object.values(wellheadNodes)) {
            wellheadNodesMerged.push(...node);
          }

          const wellheadSummaryNodes = GenerateWellheadSummaryNodes(
            manifoldNodes
          );
          const wellheadOrSummaryNodes = showWellheadSummaryNodes
            ? wellheadSummaryNodes
            : wellheadNodesMerged;

          const allNodes = [
            ...terminalNodes,
            ...flowstationNodes,
            ...gasFacilityNodes,
            ...manifoldNodes,
            ...wellheadOrSummaryNodes,
          ];

          //Edges
          const flowstationTerminalEdges = ConnectFlowstationsToTerminal(
            terminalNodes,
            flowstationNodes,
            gasFacilityNodes
          );
          const manifoldFlowstationEdges = ConnectManifoldsToStations(
            manifoldNodes,
            flowstationNodes,
            gasFacilityNodes
          );
          const wellheadManifoldEdges = ConnectWellheadsToManifolds(
            wellheadNodes,
            manifoldNodes
          );
          const wellheadSummaryManifoldEdges = ConnectWellheadSummariesToManifolds(
            wellheadSummaryNodes,
            manifoldNodes
          );
          const wellheadOrSummaryEdges = showWellheadSummaryEdges
            ? wellheadSummaryManifoldEdges
            : wellheadManifoldEdges;

          const allEdges = [
            ...flowstationTerminalEdges,
            ...manifoldFlowstationEdges,
            ...wellheadOrSummaryEdges,
          ];

          dispatch(persistNetworkElementsAction(allNodes, allEdges));
          dispatch(hideDialogAction());
          history.push("/apex/network");
        },
      },
      {
        title: "Save and Manually Generate Network",
        color: "primary",
        startIcon: <DeviceHubOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "success",
          });

          history.push("/apex/network");
        },
      },
      {
        title: "Save and Link Deck to Existing Network",
        color: "primary",
        startIcon: <LinkOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "error",
          });
        },
      },
    ];

    return (
      <div>
        <div>
          <AnalyticsComp
            title="Selected Facilities Deck"
            direction="Vertical"
            content={<Typography>{}</Typography>}
          />
        </div>
        <div className={classes.dialogContent}>
          {buttonsData.map((button, i) => (
            <Button
              key={i}
              variant={button.variant}
              color={button.color}
              onClick={button.handleAction}
              startIcon={button.startIcon}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    );
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
      <DialogContent dividers>
        {ManageDeckDialogContent()}
        <Divider />
      </DialogContent>
      <DialogActions>
        {DialogCancelButton([true], [true], [unloadDialogsAction])}
      </DialogActions>
    </Dialog>
  );
};
export default FinalizeInputDialog;
