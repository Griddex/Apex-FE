import { IUserDetails } from "../User/UserTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface IAuthor extends IUserDetails {
  authorStyles?: CSSProperties;
}

export type AuthorType = IAuthor | string;
