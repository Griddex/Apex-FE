import { DialogActions, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { saveProductionPrioritizationRequestAction } from "../../Redux/Actions/NetworkActions";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import EditOrCreateProductionPrioritizationWorkflow from "../../Workflows/EditOrCreateProductionPrioritizationWorkflow";
import {
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";

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

export interface IEditOrCreateProductionPrioritization{
  currRow?: Partial<IStoredDataRow>;
  setCurrRow?: TUseState<IStoredDataRow>;
  currentRow?: Partial<IStoredDataRow>;
  setCurrentRow?: TUseState<IStoredDataRow>;
  shouldUpdate: boolean;
  setShouldUpdate?: TUseState<boolean>;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
  forecastParametersIndex?: number;
}

const EditOrCreateProductionPrioritizationWorkflowDialog = (
  props: DialogStuff<IStoredDataRow>
) => {
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

  const storedTitles = useSelector(
    (state: RootState) =>
      state.applicationReducer["allFormTitles"]["declineParametersTitles"]
  );

  console.log("storedTitles: ", storedTitles);
  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [currRow, setCurrRow] = React.useState(currentRow);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  
  const productionPrioritizationParametersObj = { ...currRow, ...titleDesc };
  console.log("productionPrioritizationParametersObj: ", productionPrioritizationParametersObj);

  let steps = [] as string[];
  
  if (workflowProcessDefined === "createForecastingParametersWorkflow") {
    steps = [
      "Select Forecast InputDeck",
      "Production Prioritization",
      "Title and Description",
    ];
  } else {
    steps = ["Production Prioritization", "Title and Description"];
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
  } as NonNullable<IEditOrCreateProductionPrioritization> &
    ITitleAndDescriptionFormProps;

    const saveSelectedProductionPrioritization = () => {
      return saveProductionPrioritizationRequestAction(productionPrioritizationParametersObj);
    };

  const createProductionPrioritizationConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Confirm Parameters Save",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      iconType: "confirmation",
      dialogText: "Do you want to save the current production prioritization?",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            saveSelectedProductionPrioritization,
          ],
          "Save",
          "saveOutlined",
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
    finalAction: createProductionPrioritizationConfirmation,
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
          <EditOrCreateProductionPrioritizationWorkflow {...createProps} />
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

export default EditOrCreateProductionPrioritizationWorkflowDialog;
