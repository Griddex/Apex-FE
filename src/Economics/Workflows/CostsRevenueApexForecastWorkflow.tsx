import makeStyles from "@mui/styles/makeStyles";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
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
import { forecastCaseOptions } from "../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../Redux/Actions/EconomicsActions";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";

const StoredForecastResults = React.lazy(
  () => import("../../Forecast/Routes/StoredForecastResults")
);
const CostsAndRevenueApexForecast = React.lazy(
  () =>
    import(
      "../Routes/EconomicsInput/EconomicsCostsAndRevenues/CostsAndRevenueApexForecast"
    )
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "row",
    height: "90%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
  },
  workflowContent: { height: "100%", width: "100%" },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const steps = ["Select Forecast Results", "Populate Costs"];
const workflowCategory = "inputDataWorkflows";
const workflowProcess = "economicsCostsRevenuesDeckApexForecast";

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (drawer) => drawer
);
const applicationSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer,
  (reducer) => reducer
);

const activeStepSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer[workflowCategory][workflowProcess]["activeStep"],
  (step) => step
);

const forecastEconomicsAggregatedSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.forecastEconomicsAggregated,
  (data) => data
);

const CostsRevenueApexForecastWorkflow = ({
  reducer,
  finalAction,
}: IAllWorkflows) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const skipped = new Set<number>();

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const activeStep = useSelector(activeStepSelector);
  const forecastEconomicsAggregated = useSelector(
    forecastEconomicsAggregatedSelector
  );
  const { moduleName, subModuleName, workflowName } =
    useSelector(applicationSelector);

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

  const keys = Object.keys(
    forecastEconomicsAggregated as Record<string, any[]>
  );
  const allCostRevenues = keys.reduce((acc: string[], key: string) => {
    const costRevenues = forecastEconomicsAggregated[key];

    return [...acc, ...costRevenues];
  }, []);

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    isNavButtonDisabled: {
      reset: true,
      skip: true,
      back: true,
      next: allCostRevenues.length > 0 ? true : false,
    },
    finalAction,
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
                  handleSelect={(
                    option: OnChangeValue<ISelectOption, false>
                  ) => {
                    const path = `inputDataWorkflows.${workflowProcess}.forecastCase`;
                    const value = option?.value as string;

                    dispatch(updateEconomicsParameterAction(path, value));

                    setForecastCaseOption(option as ISelectOption);
                  }}
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                  containerHeight={40}
                />
              }
            />
            <StoredForecastResults
              showChart={false}
              showBaseButtons={false}
              willFetchForecast={true}
              allWorkflowProcesses={workflowProcess}
            />
          </ApexFlexContainer>
        );
      case 1:
        return (
          <CostsAndRevenueApexForecast
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
