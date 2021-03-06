import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import pick from "lodash.pick";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import {
  IEconomicsParametersSensitivitiesProps,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { itemTypes } from "../../Utils/DragAndDropItemTypes";
import { getDisabledStyle } from "../../../Application/Styles/disabledStyles";
import { economicsAnalysesMap } from "../../Data/EconomicsData";

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedAnalysesNamesSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedAnalysesNames,
  (data) => data
);

const EconomicsAnalysesPanel = ({
  economicsAnalyses,
  selectedAnalysis,
  setSelectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedAnalysesNames = useSelector(selectedAnalysesNamesSelector);

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

  const resultsAnalyisOptions = selectedAnalysesNames.map(
    (name: TEconomicsAnalysesNames) => ({
      value: name,
      label: economicsAnalysesMap[name],
    })
  );

  return (
    <div>
      <AnalyticsTitle title="Analyses Panel" />
      <div className={classes.economicsAnalysisPanel}>
        {economicsAnalyses &&
          economicsAnalyses.map((analysis, i) => {
            const { name, title, icon } = analysis;
            const isSelected = title === selectedAnalysis?.title;
            let style = {};

            if (selectedAnalysesNames.length > 1) {
              if (name === "mulitpleAnalyses") {
                if (isSelected)
                  style = {
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.primary.light,
                  };
                else style = {};
              } else {
                style = getDisabledStyle(theme);
              }
            } else {
              const isActivated = name === selectedAnalysesNames[0];
              if (isActivated) {
                if (isSelected)
                  style = {
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.primary.light,
                  };
                else style = {};
              } else {
                style = getDisabledStyle(theme);
              }
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

                  dispatch(
                    updateEconomicsParameterAction(path, pickedSelectedAnalysis)
                  );

                  dispatch(
                    updateEconomicsParameterAction(
                      "resultsAnalyisOptions",
                      resultsAnalyisOptions
                    )
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
