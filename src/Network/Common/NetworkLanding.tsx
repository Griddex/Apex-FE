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
import Image from "../../Application/Components/Visuals/Image";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import AutoNetwork from "../Images/AutoNetwork.svg";
import DeclineParameters from "../Images/DeclineParameters.svg";
import ManualNetwork from "../Images/ManualNetwork.svg";
import ProductionPrioritization from "../Images/ProductionPrioritization.svg";
import StoredDeck from "../Images/StoredDeck.svg";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import { IdType } from "./NetworkLandingTypes";

const DeclineCurveParameters = React.lazy(
  () => import("../Routes/DeclineCurveParameters")
);
const ProductionStreamPrioritization = React.lazy(
  () => import("../Routes/ProductionStreamPrioritization")
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
// const networkStoredSelector = createDeepEqualSelector(
//   (state: RootState) => state.networkReducer.storedDataWorkflows.networkStored,
//   (data) => data
// );
// const forecastingParametersStoredSelector = createDeepEqualSelector(
//   (state: RootState) =>
//     state.networkReducer.storedDataWorkflows.forecastingParametersStored,
//   (data) => data
// );

const NetworkLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const loadNetworkGenerationWorkflow = useSelector(
    loadNetworkGenerationWorkflowSelector
  );

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
      name: `Stored Forecast Parameters`,
      description: `View and create forecast parameters and store in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/forecastParameters`,
      workflowProcess: "forecastResultsStored",
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
                  forecastParameters: (
                    <StoredForecastingParameters
                      showChart={true}
                      isAllForecastParameters={true}
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
                    <DeclineCurveParameters
                      workflowProcess={"declineParametersCreate"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                  productionPrioritizationStored: (
                    <StoredProductionPrioritization
                      workflowProcess={"productionPrioritizationStored"}
                      containerStyle={{ boxShadow: "none" }}
                      isAllWellPrioritization={true}
                    />
                  ),
                  productionPrioritizationCreate: (
                    <ProductionStreamPrioritization
                    // workflowProcess={"productionPrioritizationCreate"}
                    // containerStyle={{ boxShadow: "none" }}
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
