import { CSSProperties } from "react";

export interface IUserDetails {
  avatarUrl: string;
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
