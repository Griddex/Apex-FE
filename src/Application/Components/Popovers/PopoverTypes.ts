export interface IPopover {
  icon: JSX.Element;
  closeIcon: JSX.Element;
  title: string;
  description?: string;
  handleCancel?: () => void;
  handleYes?: () => void;
}

export interface IUserProfilePopover {
  children: JSX.Element | JSX.Element[];
}
