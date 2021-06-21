import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { TAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";

export interface IStoredNetworks {
  workflowProcess: NonNullable<IStoredDataProps["wkPs"]>;
  containerStyle?: CSSProperties;
}