import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

export interface IExistingInputDeck {
  activeStep?: number;
  reducer: ReducersType;
  showChart: boolean;
  finalAction: () => void;
  containerStyle?: CSSProperties;
  handleCheckboxChange?: IExistingDataProps["handleCheckboxChange"];
}
