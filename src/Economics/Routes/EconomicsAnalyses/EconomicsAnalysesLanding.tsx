import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BaseButtons from "../../../Application/Components/BaseButtons/BaseButtons";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "./../../Redux/Actions/EconomicsActions";
import { economicsAnalysesData } from "./EconomicsAnalyses";
import { IdType, IEconomicsAnalysis } from "./EconomicsAnalysesTypes";

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
    height: "100%",
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

  const [selectedAnalysisNames, setSelectedAnalysisNames] = React.useState(
    [] as string[]
  );

  const clearEconomicsAnalysisStore = () => {
    dispatch(
      updateEconomicsParametersAction({
        loadEconomicsAnalysesWorkflow: true,
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
  };

  const analysesButtons = economicsAnalysesData.map(
    (analysisObj: IEconomicsAnalysis) => {
      const { name, title, icon } = analysisObj;

      return {
        name,
        title,
        icon,
        color: "primary",
        variant: "contained",
        handleAction: () => {
          setSelectedAnalysisNames((prev) => {
            const newNames = [...prev];

            if (newNames.includes(name)) {
              const nameIndex = newNames.findIndex(
                (n) => n.toLowerCase() === name.toLowerCase()
              );
              newNames.splice(nameIndex, 1);

              return newNames;
            } else {
              return newNames.concat(name);
            }
          });
        },
      };
    }
  );

  const disabled = selectedAnalysisNames.length === 0;

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        "selectedAnalysesNames",
        selectedAnalysisNames
      )
    );
  }, [selectedAnalysisNames.length]);

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
        <div>
          <div className={classes.rootAnalysesButtons}>
            {analysesButtons.map((button) => {
              const { icon, handleAction, title, name } = button;

              return (
                <MiniCard
                  key={title}
                  name={name as IMiniCardProps["name"]}
                  title={title as IMiniCardProps["title"]}
                  icon={icon as IMiniCardProps["icon"]}
                  moduleAction={handleAction as IMiniCardProps["moduleAction"]}
                  selected={selectedAnalysisNames}
                />
              );
            })}
          </div>
          <ApexFlexContainer
            justifyContent="center"
            alignItems="center"
            height={50}
            width={"100%"}
            moreStyles={{ marginBottom: 4 }}
          >
            <BaseButtons
              buttonTexts={["Reset", "Analysis"]}
              variants={["contained", "contained"]}
              colors={["secondary", "primary"]}
              startIcons={[
                <RotateLeftIcon key={1} />,
                <AirplayOutlinedIcon key={2} />,
              ]}
              disableds={[false, disabled]}
              shouldExecute={[true, true]}
              shouldDispatch={[false, false]}
              finalActions={[
                () => setSelectedAnalysisNames([]),
                () => {
                  clearEconomicsAnalysisStore();
                },
              ]}
              applySpace={true}
            />
          </ApexFlexContainer>
        </div>
      )}
    </>
  );
};

export default EconomicsAnalysesLanding;
