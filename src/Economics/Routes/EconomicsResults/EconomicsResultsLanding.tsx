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
import BadgeComingSoon from "../../../Application/Components/Badges/BadgeComingSoon";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import VisualyticsCharts from "../../../Economics/Images/VisualyticsCharts.svg";
import StoredDeck from "../../../Import/Images/StoredDeck.svg";
import EconomicsRank from "../../Images/EconomicsRank.svg";
import HeatMap from "../../Images/HeatMap.svg";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import EconomicsRanking from "./EconomicsRanking/EconomicsRanking";
import { IdType } from "./EconomicsResultsTypes";
import StoredEconomicsResults from "./StoredEconomicsResults";

const SensitivitiesHeatMapVisualytics = React.lazy(
  () =>
    import("./EconomicsSensitivitiesHeatMap/SensitivitiesHeatMapVisualytics")
);
const EconomicsTemplateVisualytics = React.lazy(
  () => import("./EconomicsTemplateResults/EconomicsTemplateVisualytics")
);
const EconomicsPlotChartsVisualytics = React.lazy(
  () => import("./EconomicsPlotCharts/EconomicsPlotChartsVisualytics")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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
  badge: { height: "fit-content" },
}));

const loadEconomicsResultsWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.loadEconomicsResultsWorkflow,
  (results) => results
);

const EconomicsResultsLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  const loadEconomicsResultsWorkflow = useSelector(
    loadEconomicsResultsWorkflowSelector
  );

  const economicsResultsLandingData: ILandingData[] = [
    // {
    //   name: "View Template Results",
    //   description: `View prepared tables and charts for your economics results in a responsive and perfomant canvas`,
    //   icon: (
    //     <Image
    //       className={classes.image}
    //       src={Spreadsheet}
    //       alt="Spreadsheet Logo"
    //     />
    //   ),
    //   route: `${url}/templateResults`,
    //   workflowProcess: "economicsTemplateResultsData",
    //   workflowCategory: "storedDataWorkflows",
    // },
    {
      name: "Plot Charts",
      description: `Plot economics results in highly interactive charts`,
      icon: (
        <Image
          className={classes.image}
          src={VisualyticsCharts}
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
      name: "Economics Ranking",
      description: `View key economic indicators as defined by parameter sensitivities`,
      icon: (
        <Image className={classes.image} src={EconomicsRank} alt="Chart Logo" />
      ),
      route: `${url}/economicsRanking`,
      workflowProcess: "economicsRanking",
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

  const getBadgeProps = (name: string) => {
    return {
      color: "secondary",
      ...(name === "View Template Results" && {
        badgeContent: <BadgeComingSoon />,
      }),
    } as BadgeProps;
  };

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
                  economicsRanking: <EconomicsRanking />,
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
              component={() => {
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
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
};

export default EconomicsResultsLanding;
