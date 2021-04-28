import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../../Utils/DragAndDropItemTypes";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import {
  IEconomicsAnalysis,
  TEconomicsAnalyses,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";

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
}: {
  economicsAnalyses: TEconomicsAnalyses;
}) => {
  const [selectedAnalysis, setSelectedAnalysis] = React.useState(
    {} as IEconomicsAnalysis
  );

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
        {economicsAnalyses.map((analysis) => {
          const { title, icon } = analysis;

          return (
            <div
              className={classes.economicsIconTitle}
              onClick={() => setSelectedAnalysis(analysis)}
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
