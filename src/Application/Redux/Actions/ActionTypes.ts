export interface IAction {
  type: string;
  payload?: any;
  meta?: {
    showSpinner?: boolean;
    message?: string;
    addAuth?: boolean;
    exclusive?: boolean;
  };
}
