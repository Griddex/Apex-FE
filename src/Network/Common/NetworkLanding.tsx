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
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import Spreadsheet from "../../Application/Images/Spreadsheet.svg";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import AutoNetwork from "../Images/AutoNetwork.svg";
import ManualNetwork from "../Images/ManualNetwork.svg";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import Network from "./Network";
import { IdType } from "./NetworkLandingTypes";

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
      name: "Network Manual Build",
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
      name: "Network Auto Generation",
      description: `Automatically generate production network from a forecast input deck`,
      icon: (
        <Image className={classes.image} src={AutoNetwork} alt="Auto network" />
      ),
      route: `${url}/networkAuto`,
      workflowProcess: "networkAutoGeneration",
      workflowCategory: "existingDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  const existingDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Network Results`,
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xl",
      iconType: "information",
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
                      <Network isNetworkAuto={true} />
                    </ReactFlowProvider>
                  ),
                  networkAuto: (
                    <ReactFlowProvider>
                      <Network isNetworkAuto={false} />,
                    </ReactFlowProvider>
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
