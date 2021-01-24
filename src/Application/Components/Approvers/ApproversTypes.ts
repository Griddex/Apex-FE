import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { IUserDetails } from "../User/UserTypes";

export interface IApprover extends IUserDetails {
  approversStyles?: CSSProperties;
}
