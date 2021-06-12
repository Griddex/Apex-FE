import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";

export interface IStoredInputDeck {
  activeStep?: number;
  reducer: ReducersType;
  showChart: boolean;
  finalAction: () => void;
  containerStyle?: CSSProperties;
  handleCheckboxChange?: IStoredDataProps["handleCheckboxChange"];
}
