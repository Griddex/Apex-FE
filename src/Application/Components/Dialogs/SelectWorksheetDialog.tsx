import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useSnackbar } from "notistack";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/ImportActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { workflowNextAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IAllWorkflowProcesses } from "../Workflows/WorkflowTypes";
import { ButtonProps, DialogStuff } from "./DialogTypes";

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
  listDialogContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
  },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
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

const SelectWorksheetDialog: React.FC<DialogStuff> = (props: DialogStuff) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    title,
    show,
    maxWidth,
    iconType,
    contentList,
    workflowProcess,
    workflowCategory,
  } = props;

  const wc = workflowCategory as IAllWorkflowProcesses["wrkflwCtgry"];
  const wp = workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"];

  const { skipped, isStepSkipped, activeStep, steps } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );
  const { inputFile: inputDeckWorkbook, selectedWorksheetName } = useSelector(
    (state: RootState) => state.inputReducer["importDataWorkflows"][wp]
  );
  const [selectedListItem, setSelectedListItem] = React.useState<ReactNode>("");

  const SelectWorksheetDialogContent = () => {
    return (
      <div className={classes.listDialogContent}>
        <Typography variant="body1" style={{ marginTop: 10, marginBottom: 10 }}>
          Workbook contains more than one worksheet. Please select the worksheet
          that contains the Facilities Deck
        </Typography>
        <List className={classes.listBorder}>
          {contentList &&
            contentList.map((name: string, i: number) => (
              <ListItem
                key={i}
                selected={name === selectedListItem}
                button
                onClick={() => {
                  setSelectedListItem(name);
                  dispatch(persistWorksheetAction(name, [], wp));
                }}
              >
                <ListItemAvatar>
                  <DescriptionOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText>{name}</ListItemText>
              </ListItem>
            ))}
        </List>
      </div>
    );
  };

  const prepareSelectWorksheetRoute = () => {
    const selectedWorksheetDataXLSX =
      inputDeckWorkbook.Sheets[selectedWorksheetName];

    const selectedWorksheetData = xlsx.utils.sheet_to_json<
      Record<string, React.Key>
    >(selectedWorksheetDataXLSX);

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
    }

    dispatch(
      persistWorksheetAction(selectedWorksheetName, selectedWorksheetData, wp)
    );
    dispatch(
      workflowNextAction(
        skipped as Set<number>,
        isStepSkipped as (step: number) => boolean,
        activeStep,
        steps,
        "Loading",
        wp,
        wc
      )
    );
    dispatch(hideDialogAction());
  };

  const SelectWorksheetDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
      {
        title: "Okay",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => {
          if (selectedListItem === "")
            enqueueSnackbar("Select a worksheet", {
              persist: false,
              variant: "error",
            });
          else prepareSelectWorksheetRoute();
        },
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        startIcon={button.startIcon}
        onClick={button.handleAction}
      >
        {button.title}
      </Button>
    ));
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
        {SelectWorksheetDialogContent()}
        <Divider />
      </DialogContent>
      <DialogActions>{SelectWorksheetDialogActions()}</DialogActions>
    </Dialog>
  );
};
export default SelectWorksheetDialog;
