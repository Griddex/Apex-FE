import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { TAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

export interface IExistingNetworks {
  workflowProcess: NonNullable<IExistingDataProps["wkPs"]>;
  containerStyle?: CSSProperties;
}
