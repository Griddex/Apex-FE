import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import { IEconomicsParametersSensitivitiesProps } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import ItemTypes from "../../Utils/DragAndDropItemTypes";

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

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.ECONOMICS_CALCULATION_TYPE,
      analysis: selectedAnalysis,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const opacity = isDragging ? 0.4 : 1;
  const props = { opacity };
  const classes = useStyles(props);

  return (
    <div>
      <AnalyticsTitle title="Analyses Panel" />
      <div className={classes.economicsAnalysisPanel}>
        {economicsAnalyses.map((analysis, i) => {
          const { title, icon } = analysis;
          const isSelected = title === selectedAnalysis?.title;

          return (
            <div
              key={i}
              className={classes.economicsIconTitle}
              style={
                isSelected
                  ? {
                      border: `1px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.primary.light,
                    }
                  : {}
              }
              onClick={() =>
                setSelectedAnalysis && setSelectedAnalysis(analysis)
              }
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
