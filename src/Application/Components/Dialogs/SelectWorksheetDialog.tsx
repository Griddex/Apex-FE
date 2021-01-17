import {
  Avatar,
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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import { useSnackbar } from "notistack";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/ImportActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { workflowNextAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/RootReducer";
import { ButtonProps, DialogStuff } from "./DialogTypes";

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
    // backgroundColor: (props) => props.iconColor,
    // color: (props: DialogStuff) => {
    //   return props.iconColor;
    // },
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
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const icons = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#31BFCC" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#31BFCC" }} />,
  information: <InfoIcon style={{ color: "#31BFCC" }} />,
};

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {icons[iconType ? iconType : "select"]}
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
  } = props;

  const { skipped, isStepSkipped, activeStep, steps } = useSelector(
    (state: RootState) => state.workflowReducer
  );
  const { inputFile: inputDeckWorkbook, selectedWorksheetName } = useSelector(
    (state: RootState) => state.importReducer
  );
  const [selectedListItem, setSelectedListItem] = React.useState<ReactNode>("");

  const SelectWorksheetDialogContent = () => {
    return (
      <div className={classes.listDialogContent}>
        <Typography variant="h6">
          Workbook contains more than one worksheet. Please select the worksheet
          that contains the Facilities Deck
        </Typography>
        <List className={classes.listBorder}>
          {contentList &&
            contentList.map(
              (name: ReactNode, i: string | number | null | undefined) => (
                <ListItem
                  key={i}
                  selected={name === selectedListItem}
                  button
                  onClick={() => {
                    setSelectedListItem(name);
                    dispatch(persistWorksheetAction(name, []));
                  }}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              )
            )}
        </List>
      </div>
    );
  };

  const prepareSelectWorksheetRoute = () => {
    const selectedWorksheetDataXLSX =
      inputDeckWorkbook.Sheets[selectedWorksheetName];

    const selectedWorksheetData = xlsx.utils.sheet_to_json(
      selectedWorksheetDataXLSX
    );

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
    }

    dispatch(
      persistWorksheetAction(selectedWorksheetName, selectedWorksheetData)
    );
    dispatch(
      workflowNextAction(
        skipped,
        isStepSkipped,
        activeStep,
        steps,
        "Loading",
        workflowProcess as string
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
