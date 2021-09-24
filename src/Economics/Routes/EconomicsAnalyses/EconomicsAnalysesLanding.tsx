import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { updateEconomicsParametersAction } from "./../../Redux/Actions/EconomicsActions";
import EconomicsAnalysesWorkflow from "./../EconomicsWorkflows/EconomicsAnalysesWorkflow";
import { economicsAnalyses } from "./EconomicsAnalyses";
import { IdType, IEconomicsAnalysis } from "./EconomicsAnalysesTypes";

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

const EconomicsAnalysesLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const wc = "economicsAnalysisWorkflows";

  const reducer = "economicsReducer";
  const { url, path } = useRouteMatch();

  const { loadEconomicsAnalysesWorkflow } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const analysesButtons = economicsAnalyses.map(
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
              // economicsAnalysisWorkflows: {},
              heatMapVariableXOptions: {},
              heatMapVariableYOptions: {},
              heatMapVariableZOptions: {},
              heatMapTreeByScenario: { id: "", name: "" },
              sensitivitiesHeatMapTree: { id: "", name: "" },
              sensitivitiesHeatMapData: {},
              sensitivitiesHeatMap1or2D: [],
            })
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
