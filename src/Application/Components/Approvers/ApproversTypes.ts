import { CSSProperties } from "react";
import { IUserDetails } from "../User/UserTypes";

export interface IApprover extends IUserDetails {
  approversStyles?: CSSProperties;
}
