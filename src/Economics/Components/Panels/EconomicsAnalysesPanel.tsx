import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { useDrag } from "react-dnd";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import {
  IEconomicsParametersSensitivitiesProps,
  TEconomicsAnalyses,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { itemTypes } from "../../Utils/DragAndDropItemTypes";
import pick from "lodash.pick";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const useStyles = makeStyles(() => ({
  economicsAnalysisPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  economicsIconTitle: {
    height: 80,
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  },
  economicsIcon: {
    opacity: (props: any) => props.opacity,
    height: 60,
    width: 60,
    cursor: "pointer",
    border: "1px solid grey",
    padding: 5,
  },
  economicsTitle: {
    height: 60,
    width: "auto",
    padding: 5,
    verticalAlign: "middle",
  },
}));

const EconomicsAnalysesPanel = ({
  economicsAnalyses,
  selectedAnalysis,
  setSelectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { selectedAnalysesNames } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.ECONOMICS_CALCULATION_TYPE,
    item: {
      analysis: selectedAnalysis,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  const props = { opacity };
  const classes = useStyles(props);

  return (
    <div>
      <AnalyticsTitle title="Analyses Panel" />
      <div className={classes.economicsAnalysisPanel}>
        {economicsAnalyses &&
          economicsAnalyses.map((analysis, i) => {
            const { name, title, icon } = analysis;
            const isSelected = title === selectedAnalysis?.title;
            const isActivated = selectedAnalysesNames.indexOf(name) !== -1;

            let style = {};
            if (isActivated) {
              if (isSelected)
                style = {
                  border: `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: theme.palette.primary.light,
                };
              else style = {};
            } else {
              style = {
                pointerEvents: "none",
                backgroundColor: theme.palette.grey[200],
              };
            }

            return (
              <div
                key={i}
                className={classes.economicsIconTitle}
                style={style}
                onClick={() => {
                  setSelectedAnalysis && setSelectedAnalysis(analysis);

                  const path = `economicsAnalysisWorkflows.selectedAnalysis`;
                  const pickedSelectedAnalysis = pick(analysis, [
                    "name",
                    "title",
                  ]);

                  const analysisOption = {
                    value: pickedSelectedAnalysis.name,
                    label: pickedSelectedAnalysis.title,
                  };
                  dispatch(
                    updateEconomicsParameterAction(path, pickedSelectedAnalysis)
                  );

                  //TODO Initializing heatmap  from selecting economics analysis
                  dispatch(
                    updateEconomicsParameterAction("resultsAnalyisOptions", [
                      analysisOption,
                    ])
                  );
                }}
              >
                <div ref={drag} className={classes.economicsIcon}>
                  {icon}
                </div>
                <div className={classes.economicsTitle}>{title}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EconomicsAnalysesPanel;
