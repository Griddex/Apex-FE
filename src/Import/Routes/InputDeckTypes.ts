import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";

export interface IExistingInputDeck {
  activeStep?: number;
  reducer: ReducersType;
  showChart: boolean;
  finalAction: () => void;
  containerStyle?: CSSProperties;
  // workflowProcess: NonNullable<IAllWorkflowProcesses["wrkflwPrcss"]>;
}
