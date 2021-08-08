import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import VerticalWorkflowStepper from "../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../Application/Components/Workflows/WorkflowBanner";
import { IAllWorkflows } from "../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import StoredForecastResults from "../../Forecast/Routes/StoredForecastResults";
import { forecastCaseOptions } from "../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../Redux/Actions/EconomicsActions";
import CostsAndRevenueManual from "../Routes/EconomicsInput/EconomicsCostsAndRevenues/CostsAndRevenueManual";

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
    width: "100%",
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
  workflowBody: {
    display: "flex",
    flexDirection: "row",
    height: "90%",
    width: "97%",
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
  workflowContent: { height: "100%", width: "100%" },
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

const steps = ["Select Forecast Results", "Populate Costs"];
const workflowCategory = "inputDataWorkflows";
const workflowProcess = "economicsCostsRevenuesDeckApexForecast";

const CostsRevenueApexForecastWorkflow = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  idTitleArr,
  persistSelectedIdTitleAction,
}: IAllWorkflows) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );

  const applicationData = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { moduleName, subModuleName, workflowName } = applicationData;

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const [forecastCaseOption, setForecastCaseOption] =
    React.useState<ISelectOption>(forecastCaseOptions[1]);

  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };

  const VerticalWorkflowStepperProps = {
    moduleName,
    subModuleName,
    workflowName,
    skipped,
    isStepSkipped,
    activeStep,
    steps,
    errorSteps: [],
  };

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess,
        workflowCategory
      )
    );
  }, [dispatch]);

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <ApexFlexContainer
            flexDirection="column"
            moreStyles={{ marginTop: 20 }}
          >
            <AnalyticsComp
              title="Forecast Case"
              direction="Vertical"
              containerStyle={{
                display: "flex",
                flexDirection: "row",
                width: 300,
              }}
              content={
                <ApexSelectRS
                  valueOption={forecastCaseOption}
                  data={forecastCaseOptions}
                  handleSelect={(option: ValueType<ISelectOption, false>) => {
                    const path = `inputDataWorkflows.${workflowProcess}.forecastScenario`;
                    const value = option?.value as string;
                    dispatch(updateEconomicsParameterAction(path, value));

                    setForecastCaseOption(option as ISelectOption);
                  }}
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              }
            />
            <StoredForecastResults
              showChart={false}
              showBaseButtons={false}
              shouldRunAggregation={true}
            />
          </ApexFlexContainer>
        );
      case 1:
        return (
          <CostsAndRevenueManual
            reducer={reducer}
            wkCy={"inputDataWorkflows"}
            wkPs={"economicsCostsRevenuesDeckApexForecast"}
            finalAction={finalAction}
          />
        );
      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>
        <div className={classes.workflowContent}>
          {renderImportStep(activeStep)}
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <VerticalWorkflowStepper {...VerticalWorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default CostsRevenueApexForecastWorkflow;
