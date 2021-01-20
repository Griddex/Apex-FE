import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import TabsWrapper from "../../../../Application/Components/Tabs/TabsWrapper";
import WorkflowStepper from "../../../../Application/Components/Workflows/WorkflowStepper";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSkipAction,
} from "../../../../Application/Redux/Actions/WorkflowActions";
import MatchHeaders from "../Workflows/MatchHeaders";
import MatchUnits from "../Workflows/MatchUnits";
import PreviewSave from "../Workflows/PreviewSave";
import SelectHeaderUnitData from "../Workflows/SelectHeaderUnitData";
import SelectSheet from "../Workflows/SelectSheet";
import UploadFile from "../Workflows/UploadFile";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { useTheme } from "@material-ui/core";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IWorkflowProcessState } from "../../../../Application/Redux/State/WorkflowStateTypes";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import { DialogStuff } from "./../../../../Application/Components/Dialogs/DialogTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    // width: 55,
    // height: 45,
    marginRight: theme.spacing(1),
  },
  buttonContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg:first-child": { width: 15, height: 15 },
    "& p:last-child": { fontSize: 12, fontWeight: "bold" },
  },
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5%",
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBanner: {
    display: "flex",
    justifyContent: "center",
    width: 54,
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    // borderRadius: theme.spacing(0),
    // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    "& > *": { fontWeight: "bold" },
  },
  workflowBannerHeader: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      padding: theme.spacing(0.5),
      height: 40,
      width: 50,
      // border: "1.5px solid",
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

//Props for excel workflow from forecasting or facilities
const steps = [
  "Upload File",
  "Select Worksheet",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const ExcelWorkflow = ({ workflowProcess }: IWorkflowProcessState) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[workflowProcess as string]
  );
  const applicationData = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { moduleName, subModuleName, workflowName } = applicationData;

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };

  const WorkflowStepperProps = {
    moduleName,
    subModuleName,
    workflowName,
    skipped,
    isStepSkipped,
    activeStep,
    steps,
    errorSteps: [],
  };
  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess as string
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <UploadFile workflowProcess={workflowProcess as string} />;
      case 1:
        return <SelectSheet workflowProcess={workflowProcess as string} />;
      case 2:
        return (
          <TabsWrapper>
            <SelectHeaderUnitData workflowProcess={workflowProcess as string} />
          </TabsWrapper>
        );
      case 3:
        return (
          <TabsWrapper>
            <MatchHeaders workflowProcess={workflowProcess as string} />
          </TabsWrapper>
        );
      case 4:
        return (
          <TabsWrapper>
            <MatchUnits workflowProcess={workflowProcess as string} />
          </TabsWrapper>
        );
      case 5:
        return (
          <TabsWrapper>
            <PreviewSave workflowProcess={workflowProcess as string} />
          </TabsWrapper>
        );
      default:
        return <h1>End</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>{renderImportStep(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <WorkflowStepper {...WorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            dispatch(workflowResetAction(0, workflowProcess as string))
          }
          className={classes.button}
        >
          <div className={classes.buttonContent}>
            <RotateLeftIcon />
            <Typography>{"Reset"}</Typography>
          </div>
        </Button>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() =>
            dispatch(workflowBackAction(activeStep, workflowProcess as string))
          }
          className={classes.button}
        >
          <div className={classes.buttonContent}>
            <ArrowBackIosIcon />
            <Typography>{"Back"}</Typography>
          </div>
        </Button>
        {isStepOptional() && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch(
                workflowSkipAction(
                  isStepOptional,
                  activeStep,
                  workflowProcess as string
                )
              )
            }
            className={classes.button}
          >
            {/* Skip */}
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const dialogParameters: DialogStuff = {
              name: "Manage_Deck_Dialog",
              title: `Manage ${subModuleName}`,
              type: "finalizeInputDialog",
              show: true,
              exclusive: true,
              maxWidth: "sm",
              iconType: "information",
            };

            activeStep === steps.length - 1
              ? dispatch(showDialogAction(dialogParameters))
              : dispatch(
                  workflowNextAction(
                    skipped,
                    isStepSkipped,
                    activeStep,
                    steps,
                    "Loading...",
                    workflowProcess as string
                  )
                );
          }}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? (
            <div className={classes.buttonContent}>
              <DoneAllIcon />
              <Typography>{"Finalize"}</Typography>
            </div>
          ) : (
            <div className={classes.buttonContent}>
              <ArrowForwardIosIcon />
              <Typography>{"Next"}</Typography>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExcelWorkflow;
