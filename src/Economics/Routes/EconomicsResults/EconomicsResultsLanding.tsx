import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import Spreadsheet from "../../../Application/Images/Spreadsheet.svg";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import ForecastCharts from "../../../Forecast/Images/ForecastCharts.svg";
import StoredDeck from "../../../Import/Images/StoredDeck.svg";
import HeatMap from "../../Images/HeatMap.svg";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import EconomicsPlotChartsVisualytics from "./EconomicsPlotCharts/EconomicsPlotChartsVisualytics";
import { IdType } from "./EconomicsResultsTypes";
import SensitivitiesHeatMapVisualytics from "./EconomicsSensitivitiesHeatMap/SensitivitiesHeatMapVisualytics";
import EconomicsTemplateVisualytics from "./EconomicsTemplateResults/EconomicsTemplateVisualytics";
import StoredEconomicsResults from "./StoredEconomicsResults";

const useStyles = makeStyles((theme) => ({
  economicsResultsLanding: {
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
  economicsResultsWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const EconomicsResultsLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  const { loadEconomicsResultsWorkflow } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsResultsLandingData: ILandingData[] = [
    {
      name: "View Template Results",
      description: `View prepared tables and charts for your economics results in a responsive and perfomant canvas`,
      icon: (
        <Image
          className={classes.image}
          src={Spreadsheet}
          alt="Spreadsheet Logo"
        />
      ),
      route: `${url}/templateResults`,
      workflowProcess: "economicsTemplateResultsData",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Plot Charts",
      description: `Plot economics results in highly interactive charts`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastCharts}
          alt="Chart Logo"
        />
      ),
      route: `${url}/plotchartsTables`,
      workflowProcess: "economicsResultsPlotCharts",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: "Sensitivities Heatmap",
      description: `View key economic indicators as defined by parameter sensitivities`,
      icon: <Image className={classes.image} src={HeatMap} alt="Chart Logo" />,
      route: `${url}/sensitivitiesHeatmap`,
      workflowProcess: "economicsResultsSensitivitiesHeatmap",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: `Stored Economics Results`,
      description: `Select a pre-exisiting and approved economics results data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/storedResults`,
      workflowProcess: "economicsResultsStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  // const storedDataFinalAction = () => {
  //   const dialogParameters: DialogStuff = {
  //     name: "Manage_Deck_Dialog",
  //     title: `Manage Forecast Results`,
  //     type: "textDialog",
  //     show: true,
  //     exclusive: true,
  //     maxWidth: "xl",
  //     iconType: "information",
  //   };
  //   dispatch(showDialogAction(dialogParameters));
  // };

  return (
    <>
      {loadEconomicsResultsWorkflow ? (
        <div className={classes.economicsResultsWorkflow}>
          <Switch>
            <Route exact path={`${url}/:dataInputId`}>
              {(props: RouteComponentProps<IdType>) => {
                const { match } = props;

                const {
                  params: { dataInputId },
                } = match;

                const economicsResultsWorkflows = {
                  templateResults: <EconomicsTemplateVisualytics />,
                  plotchartsTables: <EconomicsPlotChartsVisualytics />,
                  sensitivitiesHeatmap: <SensitivitiesHeatMapVisualytics />,
                  storedResults: (
                    <StoredEconomicsResults
                      reducer={"economicsReducer"}
                      containerStyle={{ boxShadow: "none" }}
                    />
                  ),
                };

                return economicsResultsWorkflows[dataInputId];
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
        <div className={classes.economicsResultsLanding}>
          {economicsResultsLandingData.map((module) => {
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
                    updateEconomicsParameterAction(
                      "loadEconomicsResultsWorkflow",
                      true
                    )
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

export default EconomicsResultsLanding;
