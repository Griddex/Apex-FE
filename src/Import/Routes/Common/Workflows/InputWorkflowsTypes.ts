interface ISubNavbarElement {
  name: string;
  route: string;
  icon: JSX.Element;
  isDropDown?: boolean;
  dropDownIcon?: JSX.Element;
  ButtonMenu?: JSX.Element;
}
export type ISubNavbarData = ISubNavbarElement[];

export interface ISubNavbar {
  subNavbarData: ISubNavbarData;
  hasExtraButton?: boolean;
  url?: string;
  ExtraButton?: () => JSX.Element;
}
