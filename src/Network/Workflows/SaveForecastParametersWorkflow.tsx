import { fade, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import SaveForecastingParametersDialog from "../Components/Dialogs/SaveForecastingParametersDialog";
import SaveForecastParametersForm from "../Components/Forms/SaveForecastParametersForm";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";
import DeclineCurveParameters from "../Routes/DeclineCurveParameters";
import ForecastParametersNameAndDescription from "../Routes/ForecastParametersNameAndDescription";
import OtherForecastingParameters from "../Routes/OtherForecastingParameters";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
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
    flexDirection: "row",
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  workflowDatabasePanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "95%",
    width: "20%",
    border: "1px solid #A8A8A8",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
    padding: 20,
  },
  workflowContent: { height: "100%", width: "90%" },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      border: `2px solid`,
      boxShadow: theme.shadows[2],
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

const steps = ["New Project Details", "Choose Unit Settings"];

const SaveForecastParametersWorkflow = (props: DialogStuff) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowProcess = "saveForecastParametersWorkflow";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer["allExistingWorkflows"][workflowProcess]
  );

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };
  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(steps, isStepOptional, isStepSkipped, workflowProcess)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const renderImportStep = (props: ISaveForecastParametersFormProps) => {
    switch (activeStep) {
      case 0:
        return (
          <DeclineCurveParameters workflowProcess="saveForecastParametersWorkflow" />
        );
      case 1:
        return <OtherForecastingParameters />;
      case 2:
        return <ForecastParametersNameAndDescription {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  const finalAction = () => {
    dispatch({ type: "HELLO" });
  };

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: finalAction,
    workflowProcess,
  };

  return (
    <SaveForecastingParametersDialog {...props}>
      <SaveForecastParametersForm>
        {({
          forecastParametersName,
          forecastParametersDescription,
          hSPName,
          timeFrequency,
          realtimeResults,
          endForecastDate,
          errors,
          touched,
          handleChange,
          isValid,
        }) =>
          renderImportStep({
            forecastParametersName,
            forecastParametersDescription,
            hSPName,
            timeFrequency,
            realtimeResults,
            endForecastDate,
            errors,
            touched,
            handleChange,
            isValid,
          })
        }
      </SaveForecastParametersForm>
      <NavigationButtons {...navigationButtonProps} />
    </SaveForecastingParametersDialog>
  );
};

export default SaveForecastParametersWorkflow;