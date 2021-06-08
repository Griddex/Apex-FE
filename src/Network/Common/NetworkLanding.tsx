import { makeStyles } from "@material-ui/core";
import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ModuleCard from "../../Application/Components/Cards/ModuleCard";
import DialogDisplayNetworkCancelButtons from "../../Application/Components/DialogButtons/DialogDisplayNetworkCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import AutoNetwork from "../Images/AutoNetwork.svg";
import ExistingDeck from "../Images/ExistingDeck.svg";
import ManualNetwork from "../Images/ManualNetwork.svg";
import DeclineParameters from "../Images/DeclineParameters.svg";
import ProductionPrioritization from "../Images/ProductionPrioritization.svg";
import {
  displayNetworkByIdRequestAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";
import ExistingDeclineParameters from "../Routes/ExistingDeclineParameters";
import ExistingNetworks from "../Routes/ExistingNetworks";
import ExistingProductionPrioritization from "../Routes/ExistingProductionPrioritization";
import NetworkAuto from "./NetworkAuto";
import { IdType } from "./NetworkLandingTypes";
import NetworkManual from "./NetworkManual";

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

const NetworkLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  const { loadNetworkGenerationWorkflow } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const networkLandingData: ILandingData[] = [
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
      workflowCategory: "existingDataWorkflows",
    },
    {
      name: "Auto Network Generation",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image className={classes.image} src={AutoNetwork} alt="Auto network" />
      ),
      route: `${url}/networkAuto`,
      workflowProcess: "networkAutoGeneration",
      workflowCategory: "existingDataWorkflows",
    },
    {
      name: "Domiciled Networks",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Auto network"
        />
      ),
      route: `${url}/networkExisting`,
      workflowProcess: "networkExisting",
      workflowCategory: "existingDataWorkflows",
    },
    {
      name: "Domiciled Decline Parameters",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image
          className={classes.image}
          src={DeclineParameters}
          alt="Decline parameters"
        />
      ),
      route: `${url}/networkExisting`,
      workflowProcess: "declineParametersExisting",
      workflowCategory: "existingDataWorkflows",
    },
    {
      name: "Domiciled Production Prioritization",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image
          className={classes.image}
          src={ProductionPrioritization}
          alt="Production prioritization"
        />
      ),
      route: `${url}/networkExisting`,
      workflowProcess: "productionPrioritizationExisting",
      workflowCategory: "existingDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  const existingNetworks = () => {
    const networkDisplayConfirmation = () => {
      const dialogParameters: DialogStuff = {
        name: "Existing_Network_Dialog",
        title: "Confirm Network Display",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        iconType: "confirmation",
        dialogText: `Do you want to display the 
        currently selected  production network diagram?`,
        actionsList: () =>
          DialogDisplayNetworkCancelButtons(
            [true, true],
            [true, true],
            [unloadDialogsAction, displayNetworkByIdRequestAction]
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(dialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Existing_Network_Dialog",
      title: "Production Networks",
      type: "existingNetworksDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "select",
      actionsList: () =>
        DialogDisplayNetworkCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, networkDisplayConfirmation]
        ),
    };

    dispatch(showDialogAction(dialogParameters));
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
                  networkExisting: (
                    <ExistingNetworks
                      workflowProcess={"networkExisting"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                  declineParametersExisting: (
                    <ExistingDeclineParameters
                      workflowProcess={"declineParametersExisting"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                  productionPrioritizationExisting: (
                    <ExistingProductionPrioritization
                      workflowProcess={"productionPrioritizationExisting"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                };

                return networkWorkflows[dataInputId];
              }}
            </Route>
            <Route
              path="*"
              render={(props) => {
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

export default NetworkLanding;
