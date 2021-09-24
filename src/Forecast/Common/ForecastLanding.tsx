import { Badge, BadgeProps, makeStyles } from "@material-ui/core";
import React from "react";
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
import ForecastGeneration from "../Images/ForecastGeneration.svg";
import StoredDeck from "../../Import/Images/StoredDeck.svg";
import QualityAssurance from "../Images/QualityAssurance.svg";
import VisualyticsCharts from "../Images/VisualyticsCharts.svg";
import {
  loadForecastResultsWorkflowAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import StoredForecastResults from "../Routes/StoredForecastResults";
import ForecastData from "../Routes/ForecastData";
import ForecastVisualytics from "../Routes/ForecastVisualytics";
import { IdType } from "./ForecastLandingTypes";
import ForecastQualityAssurance from "../Routes/ForecastQualityAssurance";
import RunForecastWorkflowDialog from "../../Network/Components/Dialogs/RunForecastWorkflowDialog";
import BadgeComingSoon from "../../Application/Components/Badges/BadgeComingSoon";

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
  badge: { height: "fit-content" },
}));

const ForecastLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  const { loadForecastResultsWorkflow } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const forecastLandingData: ILandingData[] = [
    {
      name: "Generate Forecast",
      description: `Generate forecast results seamlessly`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastGeneration}
          alt="Chart Logo"
        />
      ),
      route: `${url}/forecastGeneration`,
      workflowProcess: "forecastResultsGeneration",
    },
    {
      name: "Forecast Charts",
      description: `Plot forecast results in highly interactive charts`,
      icon: (
        <Image
          className={classes.image}
          src={VisualyticsCharts}
          alt="Chart Logo"
        />
      ),
      route: `${url}/forecastvisualytics`,
      workflowProcess: "forecastResultsVisualytics",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Forecast Quality Assurance",
      description: `Dissect forecast results data in responsive tables and identify potential errors`,
      icon: (
        <Image
          className={classes.image}
          src={QualityAssurance}
          alt="QualityAssurance Logo"
        />
      ),
      route: `${url}/forecastqualityassurance`,
      workflowProcess: "forecastResultsQualityAssurance",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Forecast Report",
      description: `View forecast results data in responsive and performant tables`,
      icon: (
        <Image
          className={classes.image}
          src={Spreadsheet}
          alt="Spreadsheet Logo"
        />
      ),
      route: `${url}/forecastdata`,
      workflowProcess: "forecastResultsData",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: `Stored Forecast Results`,
      description: `Select a pre-exisiting and approved forecast results data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approvedforecastresults`,
      workflowProcess: "forecastResultsStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const storedDataFinalAction = () => {
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

  const dialogParameters: DialogStuff = {
    name: "Run_Forecast_Dialog",
    title: "Run Forecast Workflow",
    type: "runForecastWorkflowDialog",
    show: true,
    exclusive: false,
    maxWidth: "lg",
    iconType: "run",
  };

  const getBadgeProps = (name: string) => {
    return {
      color: "secondary",
      ...(name === "Database" && { badgeContent: <BadgeComingSoon /> }),
    } as BadgeProps;
  };

  return (
    <>
      {loadForecastResultsWorkflow ? (
        <div className={classes.forecastWorkflow}>
          <Switch>
            <Route exact path={`${url}/:dataInputId`}>
              {(props: RouteComponentProps<IdType>) => {
                const { match } = props;

                const {
                  params: { dataInputId },
                } = match;

                const forecastWorkflows = {
                  forecastGeneration: (
                    <RunForecastWorkflowDialog {...dialogParameters} />
                  ),
                  forecastdata: (
                    <ForecastData
                      wrkflwCtgry={"storedDataWorkflows"}
                      wrkflwPrcss={"forecastResultsData"}
                      showChart={false}
                    />
                  ),
                  forecastqualityassurance: <ForecastQualityAssurance />,
                  forecastvisualytics: <ForecastVisualytics />,
                  approvedforecastresults: (
                    <StoredForecastResults
                      wkCy={"storedDataWorkflows"}
                      wkPs={"forecastResultsStored"}
                      showChart={true}
                      showBaseButtons={true}
                      finalAction={storedDataFinalAction}
                    />
                  ),
                };

                return forecastWorkflows[dataInputId];
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
              <Badge
                key={name}
                {...getBadgeProps(name)}
                classes={{
                  badge: classes.badge,
                }}
              >
                <ModuleCard
                  isDispatched={false}
                  moduleAction={() => {
                    dispatch(
                      loadForecastResultsWorkflowAction(
                        "loadForecastResultsWorkflow",
                        true
                      )
                    );

                    dispatch(
                      updateForecastResultsParameterAction("selectedView", name)
                    );
                  }}
                  title={name}
                  description={description}
                  icon={icon}
                  route={route}
                  wP={workflowProcess}
                  wC={workflowCategory}
                />{" "}
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ForecastLanding;
