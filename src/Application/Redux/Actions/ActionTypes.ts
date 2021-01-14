export interface IAction {
  type: string;
  payload?: any;
  meta?: Record<string, React.Key>;
}
