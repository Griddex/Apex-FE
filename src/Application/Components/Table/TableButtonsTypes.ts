export interface ITableButtonsProps {
  showExtraButtons?: boolean;
  extraButtons?: () => JSX.Element;
  componentRef?: React.MutableRefObject<any>;
}
