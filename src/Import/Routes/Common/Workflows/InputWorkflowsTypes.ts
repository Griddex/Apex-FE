import { CSSProperties } from "react";

export interface IEconomicsInputButton {
  name: string;
  className: string;
  startIcon: JSX.Element;
  endIcon?: JSX.Element;
  styles?: CSSProperties;
  handleClick: (event: React.ChangeEvent<any>) => void;
}

interface ISubNavbarElement {
  name: string;
  route: string;
  startIcon: JSX.Element;
  endIcon?: JSX.Element;
  isDropDown?: boolean;
  dropDownIcon?: JSX.Element;
  ButtonMenu?: JSX.Element;
  hasWrapper?: boolean;
  component: () => JSX.Element;
  action?: () => void;
}

export type ISubNavbarData = ISubNavbarElement[];

export interface ISubNavbar {
  subNavbarData: ISubNavbarData;
  hasExtraButton?: boolean;
  url?: string;
  ExtraButton?: () => JSX.Element;
}
