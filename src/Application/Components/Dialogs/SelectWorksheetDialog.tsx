import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme, useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useSnackbar } from "notistack";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/InputActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { workflowNextAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IInputWorkflows, ReducersType } from "../Workflows/WorkflowTypes";
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
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} >
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
            size="large">
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

const SelectWorksheetDialog = (props: DialogStuff) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {
    title,
    show,
    maxWidth,
    iconType,
    contentList,
    workflowProcess,
    workflowCategory,
    reducer,
    inputWorkbook,
  } = props;

  const wc = workflowCategory as IInputWorkflows["wkCy"];
  const wp = workflowProcess as IInputWorkflows["wkPs"];
  const reducerDefined = reducer as NonNullable<ReducersType>;

  const { skipped, isStepSkipped, activeStep, steps } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );

  const [selectedWorksheetName, setSelectedWorksheetName] = React.useState("");

  const selectWorksheetDialogContent = () => {
    return (
      <div className={classes.listDialogContent}>
        <Typography variant="body1" style={{ marginTop: 10, marginBottom: 10 }}>
          Workbook contains more than one worksheet. Please select the worksheet
          that contains the Facilities Deck
        </Typography>
        <List className={classes.listBorder}>
          {contentList &&
            contentList.map((name: string, i: number) => {
              return (
                <ListItem
                  key={i}
                  selected={name === selectedWorksheetName}
                  button
                  onClick={() => {
                    setSelectedWorksheetName(name);
                    dispatch(
                      persistWorksheetAction(reducerDefined, name, [], wp)
                    );
                  }}
                  style={
                    name === selectedWorksheetName
                      ? {
                          border: `1px solid ${theme.palette.primary.main}`,
                          backgroundColor: theme.palette.primary.light,
                        }
                      : {}
                  }
                >
                  <ListItemAvatar>
                    <DescriptionOutlinedIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              );
            })}
        </List>
      </div>
    );
  };

  const persistSelectedWorksheet = (workbook: xlsx.WorkBook) => {
    const selectedWorksheetDataXLSX = (workbook as xlsx.WorkBook).Sheets[
      selectedWorksheetName
    ];

    const selectedWorksheetData = xlsx.utils.sheet_to_json<
      Record<string, React.Key>
    >(selectedWorksheetDataXLSX);

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
      return;
    }

    dispatch(
      persistWorksheetAction(
        reducerDefined,
        selectedWorksheetName,
        selectedWorksheetData,
        wp
      )
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

  const selectWorksheetDialogActions = (inputWorkbook: xlsx.WorkBook) => {
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
          if (selectedWorksheetName === "")
            enqueueSnackbar("Select a worksheet", {
              persist: false,
              variant: "error",
            });
          else persistSelectedWorksheet(inputWorkbook);
        },
      },
    ];

    return buttonsData.map((button, i) => {
      const { variant, color, startIcon, handleAction, title } = button;

      return (
        <Button
          key={i}
          variant={variant}
          color={color}
          startIcon={startIcon}
          onClick={() => handleAction && handleAction(i as number)}
          disabled={title === "Okay" && (selectedWorksheetName ? false : true)}
        >
          {title}
        </Button>
      );
    });
  };

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

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
        {selectWorksheetDialogContent()}
        <Divider />
      </DialogContent>
      <DialogActions>
        {selectWorksheetDialogActions(inputWorkbook)}
      </DialogActions>
    </Dialog>
  );
};
export default SelectWorksheetDialog;
