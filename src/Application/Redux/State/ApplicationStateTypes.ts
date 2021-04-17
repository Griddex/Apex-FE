import { ISubNavbarData } from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import { UserMatchObjectType } from "../../../Import/Routes/Common/Workflows/MatchHeadersTypes";

export interface IApplicationState {
  moduleName: string;
  subModuleName: string;
  workflowName: string;

  subNavbarData: ISubNavbarData;

  newMainTabs: [];
  newMainTabPanels: [];
  currentMainTabValue: number;

  newContextTabs: [];
  newContextTabPanels: [];
  currentContextTabValue: number;

  subContextTabs: [];
  subContextTabPanels: [];
  currentSubContextTabValue: number;

  savedMatchObjectAll: UserMatchObjectType;
}
