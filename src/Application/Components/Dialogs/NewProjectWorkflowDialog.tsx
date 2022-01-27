import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useCallback } from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { createProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import NewProjectWorkflow from "../../../Project/Workflows/NewProjectWorkflow";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import DialogContextDrawer from "../Drawers/DialogContextDrawer";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../Workflows/WorkflowBanner";
import { DialogStuff } from "./DialogTypes";

const steps = ["Choose Unit Settings", "New Project Title & Description"];
const workflowCategory = "projectDataWorkflows";
const workflowProcess = "newProjectWorkflow";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const storedTitlesSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer?.allFormTitles?.projectTitles,
  (projectTitles) => projectTitles
);
const activeStepSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer[workflowCategory][workflowProcess]["activeStep"],
  (activeStep) => activeStep
);

const NewProjectWorkflowDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, isDialog } = props;

  const storedTitles = useSelector(storedTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const skipped = new Set<number>();
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

  const finalAction = (titleDesc: Record<string, string>) => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Create_Project_Dialog",
      title: "Create Project Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to create the new project?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, () => createProjectAction(titleDesc, true)],
          "Create",
          "createOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    isNavButtonDisabled: {
      reset: false,
      skip: false,
      back: activeStep === 0 ? true : false,
      next: false,
    },
    nextOrFinalDisabled: disable,
    finalAction: () => finalAction(titleDesc),
    finalNavIcon: () => <SaveOutlinedIcon />,
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
        workflowProcess,
        workflowCategory
      )
    );
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <NewProjectWorkflow
            activeStep={activeStep}
            setTitle={setFormTitle}
            setDescription={setFormDescription}
            setDisable={setDisable}
            storedTitles={storedTitles}
            isDialog={isDialog}
          />
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

export default NewProjectWorkflowDialog;
