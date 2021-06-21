import { DialogActions, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import { ITitleAndDescriptionFormProps } from "../../../Application/Components/Forms/FormTypes";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowDialogBanner from "../../../Application/Components/Workflows/WorkflowDialogBanner";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
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

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const CreateForecastingParametersWorkflowDialog = (
  props: DialogStuff<IForecastParametersStoredRow>
) => {
  const workflowCategory = "networkDataWorkflows";

  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    workflowProcess,
    rows,
    setRows,
    currentRow,
    forecastParametersIndex,
  } = props;

  const rowsDefined = rows as NonNullable<IForecastParametersStoredRow[]>;
  const setRowsDefined = setRows as NonNullable<
    TUseState<IForecastParametersStoredRow[]>
  >;
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const storedTitles = useSelector(
    (state: RootState) =>
      state.applicationReducer["allFormTitles"]["forecastingParametersTitles"]
  );

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

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
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcessDefined]
  );

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
    currentRow,
    setRows: setRowsDefined,
    rows: rowsDefined,
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
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveForecastParametersRequestAction(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
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
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <WorkflowDialogBanner activeStep={activeStep} steps={steps} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <EditOrCreateForecastParametersWorkflow {...createProps} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </div>
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};

export default CreateForecastingParametersWorkflowDialog;