import CloseIcon from "@mui/icons-material/Close";
import { DialogActions, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import { ITitleAndDescriptionFormProps } from "../../../Application/Components/Forms/FormTypes";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { saveForecastParametersRequestAction } from "../../Redux/Actions/NetworkActions";
import { IEditOrCreateForecastingParameters } from "../../Routes/EditOrCreateForecastingParameters";
import EditOrCreateForecastParametersWorkflow from "../../Workflows/EditOrCreateForecastParametersWorkflow";
import { IForecastParametersStoredRow } from "./StoredNetworksDialogTypes";

const useStyles = makeStyles((theme) => ({
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
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    color: theme.palette.primary.main,
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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const forecastingParametersTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["forecastingParametersTitles"],
  (title) => title
);

const EditOrCreateForecastingParametersWorkflowDialog: React.FC<
  DialogStuff<IForecastParametersStoredRow>
> = (props) => {
  const workflowCategory = "networkDataWorkflows";
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    workflowProcess,
    currentRow,
    forecastParametersIndex,
  } = props;

  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const storedTitles = useSelector(forecastingParametersTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [currRow, setCurrRow] = React.useState(currentRow);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const forecastingParametersObj = { ...currRow, ...titleDesc };

  let steps = [] as string[];
  if (workflowProcessDefined === "createForecastingParametersWorkflow") {
    steps = [
      "Select Forecast InputDeck",
      "Forecast Parameters",
      "Title and Description",
    ];
  } else {
    steps = ["Forecast Parameters", "Title and Description"];
  }

  const skipped = new Set<number>();

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcessDefined][
        "activeStep"
      ],
    (activeStep) => activeStep
  );

  const activeStep = useSelector(activeStepSelector);

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );

  const isStepSkipped = useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const createProps = {
    shouldUpdate,
    setShouldUpdate,
    currRow,
    setCurrRow,
    activeStep,
    workflowProcess: workflowProcessDefined,
    forecastParametersIndex,

    title: formTitle,
    setTitle: setFormTitle,
    description: formDescription,
    setDescription: setFormDescription,
    storedTitles,
  } as NonNullable<IEditOrCreateForecastingParameters> &
    ITitleAndDescriptionFormProps;

  const createForecastingParametersConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Confirm Parameters Save",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      iconType: "confirmation",
      dialogText: "Do you want to save the current forecasting parameters?",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () => saveForecastParametersRequestAction(forecastingParametersObj),
          ],
          "Save",
          "saveOutlined",
          false,
          "Some",
          2
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const nextOrFinalDisabledFunc = () => {
    if (activeStep >= 1) {
      if (formTitle) return false;
      else return true;
    } else return false;
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: createForecastingParametersConfirmation,
    workflowProps,
    workflowProcess,
    workflowCategory,
    nextOrFinalDisabled: nextOrFinalDisabledFunc(),
  };

  React.useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcessDefined,
        workflowCategory
      )
    );
  }, [dispatch]);

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
        <WorkflowBanner
          activeStep={activeStep}
          steps={steps}
          subModuleName={title as string}
        />
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <ApexFlexContainer>
          <EditOrCreateForecastParametersWorkflow {...createProps} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </ApexFlexContainer>
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};

export default EditOrCreateForecastingParametersWorkflowDialog;
