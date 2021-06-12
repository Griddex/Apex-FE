import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface IForecastRoutes {
  wrkflwCtgry: "storedDataWorkflows";
  wrkflwPrcss: IStoredDataProps["wkPs"];
  showChart?: boolean;
  finalAction?: () => void;
  chartButtons?: IChartButtonsProps;
  containerStyle?: CSSProperties;
}
