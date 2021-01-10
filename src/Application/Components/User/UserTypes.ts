import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface IUserDetails {
  imgUrl: string;
  name: string;
  callName?: string;
  email?: string;
  jobTitle?: string;
  role?: "Admin" | "Corporate Forecaster" | "Asset Forecaster" | "Economist";
}

export interface IIconNameComp {
  icon: JSX.Element;
  name: string;
  iconNameStyles?: CSSProperties;
}
