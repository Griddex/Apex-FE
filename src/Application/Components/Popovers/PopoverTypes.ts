export interface IPopover {
  icon: JSX.Element;
  closeIcon: JSX.Element;
  title: string;
  description?: string;
  handleCancel?: () => void;
  handleYes?: () => void;
}
