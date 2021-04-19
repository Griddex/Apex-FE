import { IAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

const getWorkflowClass = (wp: IAllWorkflowProcesses["wrkflwPrcss"]) => {
  let workflowClass = "";

  if (wp.includes("facilities")) workflowClass = "facilities";
  else if (wp.includes("forecast")) workflowClass = "forecast";
  else if (wp.includes("economics")) workflowClass = "economics";
  else workflowClass = "forecast";

  return workflowClass;
};

export default getWorkflowClass;
