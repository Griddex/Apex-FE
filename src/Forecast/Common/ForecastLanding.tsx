import { Badge, BadgeProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BadgeComingSoon from "../../Application/Components/Badges/BadgeComingSoon";
import ModuleCard from "../../Application/Components/Cards/ModuleCard";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import Spreadsheet from "../../Application/Images/Spreadsheet.svg";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import StoredDeck from "../../Import/Images/StoredDeck.svg";
import ForecastGeneration from "../Images/ForecastGeneration.svg";
import QualityAssurance from "../Images/QualityAssurance.svg";
import VisualyticsCharts from "../Images/VisualyticsCharts.svg";
import {
  loadForecastResultsWorkflowAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IdType } from "./ForecastLandingTypes";

const RunForecastWorkflowDialog = React.lazy(
  () => import("../../Network/Components/Dialogs/RunForecastWorkflowDialog")
);
const ForecastQualityAssurance = React.lazy(
  () => import("../Routes/ForecastQualityAssurance")
);
const ForecastVisualytics = React.lazy(
  () => import("../Routes/ForecastVisualytics")
);
const ForecastData = React.lazy(() => import("../Routes/ForecastData"));
const StoredForecastResults = React.lazy(
  () => import("../Routes/StoredForecastResults")
);

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const loadForecastResultsWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.loadForecastResultsWorkflow,
  (workflow) => workflow
);

const ForecastLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const loadForecastResultsWorkflow = useSelector(
    loadForecastResultsWorkflowSelector
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
    // {
    //   name: "Forecast Report",
    //   description: `View forecast results data in responsive and performant tables`,
    //   icon: (
    //     <Image
    //       className={classes.image}
    //       src={Spreadsheet}
    //       alt="Spreadsheet Logo"
    //     />
    //   ),
    //   route: `${url}/forecastdata`,
    //   workflowProcess: "forecastResultsData",
    //   workflowCategory: "storedDataWorkflows",
    // },
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
    title: "Run Forecast",
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
                    <RunForecastWorkflowDialog
                      {...dialogParameters}
                      isDialog={false}
                    />
                  ),
                  forecastvisualytics: <ForecastVisualytics />,
                  forecastqualityassurance: <ForecastQualityAssurance />,
                  forecastdata: (
                    <ForecastData
                      wrkflwCtgry={"storedDataWorkflows"}
                      wrkflwPrcss={"forecastResultsData"}
                      showChart={false}
                    />
                  ),
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
                />
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ForecastLanding;
