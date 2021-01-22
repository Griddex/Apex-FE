export interface INavigationButtonsProp {
  mainNav: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  finalAction?: () => void;
  finalActionArgs?: any[];
  workflowProcess?: string;
}
