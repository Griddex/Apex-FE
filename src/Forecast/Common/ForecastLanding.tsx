import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ModuleCard from "../../Application/Components/Cards/ModuleCard";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import ExistingDeck from "../../Import/Images/ExistingDeck.svg";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import ForecastCharts from "../Images/ForecastCharts.svg";
import ExistingForecastResults from "../Routes/ExistingForecastResults";
import ForecastVisualytics from "../Routes/ForecastVisualytics";
import { IdType, IForecastLandingData } from "./ForecastLandingTypes";

const useStyles = makeStyles((theme) => ({
  forecastLanding: {
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
  forecastWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const ForecastLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url, path } = useRouteMatch();

  // const { loadWorkflow } = useSelector(
  //   (state: RootState) => state.layoutReducer
  // );

  const [loadWorkflow, setLoadWorkflow] = React.useState(false);

  const forecastLandingData: IForecastLandingData[] = [
    {
      name: "View Charts",
      description: `View forecast results in highly interactive charts`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastCharts}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/forecastvisualytics`,
      workflowProcess: "forecastResultsVisualytics",
      workflowCategory: "existingDataWorkflows",
    },
    {
      name: `Existing Forecast Results`,
      description: `Select a pre-exisiting and approved forecast results data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approvedforecastresults`,
      workflowProcess: "forecastResultsExisting",
      workflowCategory: "existingDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  const existingDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Forecast Results`,
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xl",
      iconType: "information",
    };
    dispatch(showDialogAction(dialogParameters));
  };

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ForecastVariableButtonsMenu />,
  };

  return (
    <>
      {loadWorkflow ? (
        <div className={classes.forecastWorkflow}>
          <Switch>
            <Route exact path={`${url}/:dataInputId`}>
              {(props: RouteComponentProps<IdType>) => {
                const { match } = props;

                const {
                  params: { dataInputId },
                } = match;

                const forecastWorkflows = {
                  forecastvisualytics: (
                    <ForecastVisualytics
                      chartButtons={chartButtons}
                      wrkflwCtgry={"existingDataWorkflows"}
                      wrkflwPrcss={"forecastResultsVisualytics"}
                    />
                  ),
                  approvedforecastresults: (
                    <ExistingForecastResults
                      wkCy={"existingDataWorkflows"}
                      wkPs={"forecastResultsExisting"}
                      showChart={true}
                      finalAction={existingDataFinalAction}
                    />
                  ),
                };

                return forecastWorkflows[dataInputId];
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
        <div className={classes.forecastLanding}>
          {forecastLandingData.map((module) => {
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
                  setLoadWorkflow(true);
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

export default ForecastLanding;
