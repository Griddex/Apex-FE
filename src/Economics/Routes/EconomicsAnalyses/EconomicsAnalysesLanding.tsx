import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "./../../Redux/Actions/EconomicsActions";
import { IdType, IEconomicsAnalysis } from "./EconomicsAnalysesTypes";
import { economicsAnalysesData } from "./EconomicsAnalyses";

const EconomicsAnalysesWorkflow = React.lazy(
  () => import("./../EconomicsWorkflows/EconomicsAnalysesWorkflow")
);

const useStyles = makeStyles(() => ({
  rootAnalysesButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      height: 200,
      width: 185,
      margin: 10,
    },
    padding: 40,
  },
  importWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const loadEconomicsAnalysesWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.loadEconomicsAnalysesWorkflow,
  (admin) => admin
);

const EconomicsAnalysesLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { path } = useRouteMatch();

  const loadEconomicsAnalysesWorkflow = useSelector(
    loadEconomicsAnalysesWorkflowSelector
  );

  const analysesButtons = economicsAnalysesData.map(
    (analysisObj: IEconomicsAnalysis) => {
      const { name, title, icon } = analysisObj;

      const styledIcon = React.cloneElement(icon, {
        fontSize: "default",
        color: "primary",
      });

      return {
        title,
        icon,
        color: "primary",
        variant: "contained",
        handleAction: () => {
          dispatch(
            updateEconomicsParametersAction({
              loadEconomicsAnalysesWorkflow: true,
              selectedAnalysesNames: [name],
              heatMapVariableXOptions: {},
              heatMapVariableYOptions: {},
              heatMapVariableZOptions: {},
              heatMapTreeByScenario: { id: "", name: "" },
              sensitivitiesHeatMapTree: { id: "", name: "" },
              sensitivitiesHeatMapData: {},
              sensitivitiesHeatMap1or2D: [],
            })
          );
          dispatch(
            updateEconomicsParameterAction(
              "economicsAnalysisWorkflows.showSensitivitiesTable",
              false
            )
          );
          dispatch(
            updateEconomicsParameterAction(
              "economicsAnalysisWorkflows.sensitivitiesTable",
              []
            )
          );
          dispatch(
            updateEconomicsParameterAction(
              "economicsAnalysisWorkflows.sensitivitiesTableTitle",
              ""
            )
          );
        },
      };
    }
  );

  return (
    <>
      {loadEconomicsAnalysesWorkflow ? (
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const economicsAnalysesWorkflows = {
                analysisWorkflow: <EconomicsAnalysesWorkflow />,
              };

              return economicsAnalysesWorkflows["analysisWorkflow"];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.rootAnalysesButtons}>
          {analysesButtons.map((button) => {
            const { icon, handleAction, title } = button;

            return (
              <MiniCard
                key={title}
                title={title as IMiniCardProps["title"]}
                icon={icon as IMiniCardProps["icon"]}
                moduleAction={handleAction as IMiniCardProps["moduleAction"]}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default EconomicsAnalysesLanding;
