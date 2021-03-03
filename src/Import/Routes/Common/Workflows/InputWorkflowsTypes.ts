interface ISubNavbarElement {
  name: string;
  route: string;
  icon: JSX.Element;
  isDropDown?: boolean;
  dropDownIcon?: JSX.Element;
  ButtonMenu?: React.FunctionComponent;
}
export type ISubNavbarData = ISubNavbarElement[];
