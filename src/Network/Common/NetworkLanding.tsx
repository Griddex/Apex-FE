import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { ReactFlowProvider } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ModuleCard from "../../Application/Components/Cards/ModuleCard";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import { updateDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import AutoNetwork from "../Images/AutoNetwork.svg";
import DeclineParameters from "../Images/DeclineParameters.svg";
import ManualNetwork from "../Images/ManualNetwork.svg";
import ProductionPrioritization from "../Images/ProductionPrioritization.svg";
import StoredDeck from "../Images/StoredDeck.svg";
import ForecastParameters from "../Images/ForecastParameters.svg";
import {
  fetchStoredForecastingParametersRequestAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";
import { IdType } from "./NetworkLandingTypes";
import EditOrCreateForecastParametersWorkflow from "../Workflows/EditOrCreateForecastParametersWorkflow";

const EditOrCreateDeclineParametersWorkflow = React.lazy(
  () => import("../Workflows/EditOrCreateDeclineParametersWorkflow")
);
const EditOrCreateProductionPrioritizationWorkflow = React.lazy(
  () => import("../Workflows/EditOrCreateProductionPrioritizationWorkflow")
);
const StoredDeclineCurveParameters = React.lazy(
  () => import("../Routes/StoredDeclineCurveParameters")
);
const StoredForecastingParameters = React.lazy(
  () => import("../Routes/StoredForecastingParameters")
);
const StoredNetworks = React.lazy(() => import("../Routes/StoredNetworks"));
const StoredProductionPrioritization = React.lazy(
  () => import("../Routes/StoredProductionPrioritization")
);
const NetworkAuto = React.lazy(() => import("./NetworkAuto"));
const NetworkManual = React.lazy(() => import("./NetworkManual"));

const useStyles = makeStyles((theme) => ({
  networkLanding: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
      height: 370,
      width: 240,
    },
  },
  networkWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const loadNetworkGenerationWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.loadNetworkGenerationWorkflow,
  (data) => data
);

const forecastingParametersTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["forecastingParametersTitles"],
  (title) => title
);
const declineParametersTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["declineParametersTitles"],
  (title) => title
);
const prioritizationTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["productionPrioritizationTitles"],
  (title) => title
);

// const networkStoredSelector = createDeepEqualSelector(
//   (state: RootState) => state.networkReducer.storedDataWorkflows.networkStored,
//   (data) => data
// );
// const forecastingParametersStoredSelector = createDeepEqualSelector(
//   (state: RootState) =>
//     state.networkReducer.storedDataWorkflows.forecastingParametersStored,
//   (data) => data
// );

const activeStepSelectorFctParams = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer["networkDataWorkflows"]["forecastParametersCreate"][
      "activeStep"
    ],
  (activeStep) => activeStep
);
const activeStepSelectorPrtzn = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer["networkDataWorkflows"][
      "productionPrioritizationCreate"
    ]["activeStep"],
  (activeStep) => activeStep
);
const activeStepSelectorDeclineParams = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer["networkDataWorkflows"]["declineParametersCreate"][
      "activeStep"
    ],
  (activeStep) => activeStep
);

const NetworkLanding = () => {
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;
  const reducer = "networkReducer";
  const stepsFctParams = [
    "Select Forecast InputDeck",
    "Forecast Parameters",
    "Title and Description",
  ];
  const stepsPrtzn = [
    "Select Forecast InputDeck",
    "Production Prioritization",
    "Title and Description",
  ];
  const stepsDeclineParams = [
    "Select Forecast InputDeck",
    "Decline Parameters",
    "Title and Description",
  ];

  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const loadNetworkGenerationWorkflow = useSelector(
    loadNetworkGenerationWorkflowSelector
  );

  const activeStepFctParams = useSelector(activeStepSelectorFctParams);
  const activeStepPrtzn = useSelector(activeStepSelectorPrtzn);
  const activeStepDeclineParams = useSelector(activeStepSelectorDeclineParams);

  const forecastingParametersTitles = useSelector(
    forecastingParametersTitlesSelector
  );
  const declineParametersTitles = useSelector(declineParametersTitlesSelector);
  const prioritizationTitles = useSelector(prioritizationTitlesSelector);

  const [fctParamsTitle, setFctParamsTitle] = React.useState("");
  const [fctParamsDesc, setFctParamsDesc] = React.useState("");
  const [declineParamsTitle, setDeclineParamsTitle] = React.useState("");
  const [declineParamsDesc, setDeclineParamsDesc] = React.useState("");
  const [prioritizationTitle, setPrioritizationTitle] = React.useState("");
  const [prioritizationDesc, setPrioritizationDesc] = React.useState("");

  const networkLandingData: ILandingData[] = [
    {
      name: "Auto Network Generation",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image className={classes.image} src={AutoNetwork} alt="Auto network" />
      ),
      route: `${url}/networkAuto`,
      workflowProcess: "networkAutoGeneration",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Manual Network Build",
      description: `Manually build production network from a forecast input deck or direct input`,
      icon: (
        <Image
          className={classes.image}
          src={ManualNetwork}
          alt="Manual network"
        />
      ),
      route: `${url}/networkManual`,
      workflowProcess: "networkManualBuild",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Stored Networks",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image className={classes.image} src={StoredDeck} alt="Auto network" />
      ),
      route: `${url}/networkStored`,
      workflowProcess: "networkStored",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: `Create Forecast Parameters`,
      description: `create forecast parameters and store in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastParameters}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/forecastParametersCreate`,
      workflowProcess: "forecastParametersCreate",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: `Stored Forecast Parameters`,
      description: `View and create forecast parameters and store in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastParameters}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/forecastParametersStored`,
      workflowProcess: "forecastParametersStored",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Create Decline Parameters",
      description: `Create decline parameters dataset as key input forecast generation`,
      icon: (
        <Image
          className={classes.image}
          src={DeclineParameters}
          alt="Decline parameters"
        />
      ),
      route: `${url}/declineParametersCreate`,
      workflowProcess: "declineParametersCreate",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Stored Decline Parameters",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image
          className={classes.image}
          src={DeclineParameters}
          alt="Decline parameters"
        />
      ),
      route: `${url}/declineParametersStored`,
      workflowProcess: "declineParametersStored",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Create Production Prioritization",
      description: `Create and utilize production optimization options for your forecast run`,
      icon: (
        <Image
          className={classes.image}
          src={ProductionPrioritization}
          alt="Production prioritization"
        />
      ),
      route: `${url}/productionPrioritizationCreate`,
      workflowProcess: "productionPrioritizationCreate",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Stored Production Prioritization",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image
          className={classes.image}
          src={ProductionPrioritization}
          alt="Production prioritization"
        />
      ),
      route: `${url}/productionPrioritizationStored`,
      workflowProcess: "productionPrioritizationStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const updateTableActionConfirmation =
    (id: string) => (titleDesc: Record<string, string>) => {
      const updateDataUrl = `${mainUrl}/${id}`;

      const confirmationDialogParameters: DialogStuff = {
        name: "Update_Data_Dialog_Confirmation",
        title: `Update Confirmation`,
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to proceed with this update?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () =>
                updateDataByIdRequestAction(
                  reducer,
                  updateDataUrl as string,
                  titleDesc,
                  fetchStoredForecastingParametersRequestAction as () => IAction
                ),
            ],
            "Update",
            "updateOutlined",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

  return (
    <>
      {loadNetworkGenerationWorkflow ? (
        <div className={classes.networkWorkflow}>
          <Switch>
            <Route exact path={`${url}/:dataInputId`}>
              {(props: RouteComponentProps<IdType>) => {
                const { match } = props;

                const {
                  params: { dataInputId },
                } = match;

                const networkWorkflows = {
                  networkManual: (
                    <ReactFlowProvider>
                      <NetworkManual isNetworkAuto={false} />
                    </ReactFlowProvider>
                  ),
                  networkAuto: (
                    <ReactFlowProvider>
                      <NetworkAuto isNetworkAuto={true} />,
                    </ReactFlowProvider>
                  ),
                  networkStored: (
                    <StoredNetworks
                      workflowProcess={"networkStored"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                  forecastParametersStored: (
                    <StoredForecastingParameters
                      showChart={true}
                      isAllForecastParameters={true}
                      updateTableActionConfirmation={
                        updateTableActionConfirmation
                      }
                    />
                  ),
                  forecastParametersCreate: (
                    <EditOrCreateForecastParametersWorkflow
                      workflowProcess={"forecastParametersCreate"}
                      activeStep={activeStepFctParams}
                      title={fctParamsTitle}
                      setTitle={setFctParamsTitle}
                      description={fctParamsDesc}
                      setDescription={setFctParamsDesc}
                      storedTitles={forecastingParametersTitles}
                      steps={stepsFctParams}
                    />
                  ),
                  declineParametersStored: (
                    <StoredDeclineCurveParameters
                      workflowProcess={"declineParametersStored"}
                      containerStyle={{ boxShadow: "none" }}
                      showChart={true}
                      isAllDeclineParameters={true}
                    />
                  ),
                  declineParametersCreate: (
                    <EditOrCreateDeclineParametersWorkflow
                      workflowProcess={"declineParametersCreate"}
                      activeStep={activeStepDeclineParams}
                      title={declineParamsTitle}
                      setTitle={setDeclineParamsTitle}
                      description={declineParamsDesc}
                      setDescription={setDeclineParamsDesc}
                      storedTitles={declineParametersTitles}
                      steps={stepsDeclineParams}
                    />
                  ),
                  productionPrioritizationCreate: (
                    <EditOrCreateProductionPrioritizationWorkflow
                      workflowProcess={"productionPrioritizationCreate"}
                      activeStep={activeStepPrtzn}
                      title={prioritizationTitle}
                      setTitle={setPrioritizationTitle}
                      description={prioritizationDesc}
                      setDescription={setPrioritizationDesc}
                      storedTitles={prioritizationTitles}
                      steps={stepsPrtzn}
                    />
                  ),
                  productionPrioritizationStored: (
                    <StoredProductionPrioritization
                      workflowProcess={"productionPrioritizationStored"}
                      containerStyle={{ boxShadow: "none" }}
                      showChart={true}
                      isAllWellPrioritization={true}
                    />
                  ),
                };

                return networkWorkflows[dataInputId];
              }}
            </Route>
            <Route
              path="*"
              component={() => {
                return <h1>Not Available</h1>;
              }}
            />
          </Switch>
        </div>
      ) : (
        <div className={classes.networkLanding}>
          {networkLandingData.map((module) => {
            const {
              icon,
              name,
              description,
              route,
              workflowProcess,
              workflowCategory,
            } = module;

            return (
              <ModuleCard
                key={name}
                isDispatched={false}
                moduleAction={() => {
                  dispatch(
                    updateNetworkParameterAction(
                      "loadNetworkGenerationWorkflow",
                      true
                    )
                  );

                  const isNetworkAuto = name.toLowerCase().includes("auto");
                  dispatch(
                    updateNetworkParameterAction("isNetworkAuto", isNetworkAuto)
                  );
                }}
                title={name}
                description={description}
                icon={icon}
                route={route}
                wP={workflowProcess}
                wC={workflowCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default React.memo(NetworkLanding);
