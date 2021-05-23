import { IAllWorkflows } from "../Components/Workflows/WorkflowTypes";

const getWorkflowClass = (wp: IAllWorkflows["wrkflwPrcss"]) => {
  let workflowClass = "";

  const wpLowerCase = wp.toLowerCase();

  if (wpLowerCase.includes("facilities")) workflowClass = "facilities";
  else if (wpLowerCase.includes("forecast")) workflowClass = "forecast";
  else if (wpLowerCase.includes("costs"))
    workflowClass = "economicsCostsRevenues";
  else if (wpLowerCase.includes("parameters"))
    workflowClass = "economicsParameters";
  else workflowClass = "forecast";

  return workflowClass;
};

export default getWorkflowClass;
