export interface IChartButtonsProps {
  showExtraButtons?: boolean;
  extraButtons?: () => JSX.Element;
  componentRef: React.MutableRefObject<any>;
}
